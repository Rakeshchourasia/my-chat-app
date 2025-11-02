require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/auth.routes');
const channelRoutes = require('./src/routes/channel.routes');
const messageRoutes = require('./src/routes/message.routes');
const aiRoutes = require('./src/routes/ai.routes');

const errorHandler = require('./src/middleware/error.middleware');
const { apiLimiter } = require('./src/middleware/rateLimiter.middleware');
const jwt = require('jsonwebtoken');
const Message = require('./src/models/Message.model');
const Channel = require('./src/models/Channel.model');
const User = require('./src/models/User.model');
const aiService = require('./src/services/ai.service');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || '*',
    methods: ['GET','POST']
  }
});

// connect DB
connectDB(process.env.MONGO_URI);

// middlewares
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan('dev'));

// apply rate limiter to all API routes
app.use('/api/', apiLimiter);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ai', aiRoutes);

// health
app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

// error handler
app.use(errorHandler);

// SOCKET.IO AUTH (uses JWT sent via handshake.auth.token)
io.use(async (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    // allow anonymous sockets optionally
    return next();
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) return next(new Error('Invalid user'));
    socket.user = { id: user._id.toString(), name: user.name, role: user.role, avatarUrl: user.avatarUrl };
    next();
  } catch (err) {
    console.warn('Socket auth failed', err.message);
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected', socket.id, 'user:', socket.user?.id);

  // join a channel room and send recent messages
  socket.on('joinChannel', async (channelId) => {
    try {
      socket.join(channelId);
      const messages = await Message.find({ channel: channelId }).sort({ createdAt: -1 }).limit(50).populate('sender','name avatarUrl').lean();
      socket.emit('channelHistory', messages.reverse());
      // optionally broadcast presence
      socket.to(channelId).emit('userJoined', { user: socket.user || null, channelId });
    } catch (err) {
      console.error('joinChannel error', err);
      socket.emit('error', { message: 'Could not join channel' });
    }
  });

  socket.on('leaveChannel', (channelId) => {
    socket.leave(channelId);
    socket.to(channelId).emit('userLeft', { user: socket.user || null, channelId });
  });

  // typing indicator
  socket.on('typing', (payload) => {
    const { channelId } = payload;
    socket.to(channelId).emit('typing', { user: socket.user, channelId });
  });

  // Receive messages and broadcast
  socket.on('sendMessage', async (payload) => {
    try {
      // payload: { channelId, content, meta }
      if (!socket.user) return socket.emit('error', { message: 'Auth required' });
      const { channelId, content, meta } = payload;
      if (!channelId || !content) return socket.emit('error', { message: 'Missing channel or content' });

      const message = await Message.create({
        channel: channelId,
        sender: socket.user.id,
        content,
        meta: meta || {}
      });
      const populated = await message.populate('sender','name avatarUrl');

      io.to(channelId).emit('message', populated);

      // AI trigger: starts with /ai or channel meta has aiEnabled true or meta.requestAI true
      const shouldTriggerAI = content.trim().startsWith('/ai') || (meta && meta.requestAI) || (await Channel.findById(channelId).then(c => c?.meta?.aiEnabled));
      if (shouldTriggerAI) {
        // extract prompt (remove /ai)
        const prompt = content.replace(/^\/ai\s*/i, '').trim() || 'Respond concisely.';
        try {
          const aiText = await aiService.generateAssistantReply(prompt);
          const aiMessage = await Message.create({
            channel: channelId,
            sender: null,
            content: aiText,
            meta: { ai: true, replyTo: message._id }
          });
          io.to(channelId).emit('message', aiMessage);
        } catch (aiErr) {
          console.error('AI failed', aiErr);
          // Inform channel that AI failed
          io.to(channelId).emit('message', {
            channel: channelId,
            sender: null,
            content: '[AI error: failed to fetch response]',
            meta: { ai: true, error: true },
            createdAt: new Date()
          });
        }
      }
    } catch (err) {
      console.error('sendMessage error', err);
      socket.emit('error', { message: 'Could not send message' });
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected', socket.id, reason);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
