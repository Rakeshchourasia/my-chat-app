const Message = require('../models/Message.model');

exports.postMessage = async (req, res, next) => {
  try {
    const { channel, content, meta } = req.body;
    if (!channel || !content) return res.status(400).json({ error: 'channel and content required' });

    const message = await Message.create({
      channel,
      sender: req.user._id,
      content,
      meta: meta || {}
    });
    const populated = await message.populate('sender', 'name avatarUrl');
    res.json(populated);
  } catch (err) {
    next(err);
  }
};

exports.getChannelMessages = async (req, res, next) => {
  try {
    const channelId = req.params.channelId;
    const limit = parseInt(req.query.limit || '100', 10);
    const messages = await Message.find({ channel: channelId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('sender', 'name avatarUrl')
      .lean();
    res.json(messages.reverse());
  } catch (err) {
    next(err);
  }
};
