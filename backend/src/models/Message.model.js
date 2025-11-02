const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for system/bot messages
  content: { type: String, required: true },
  meta: { type: Object, default: {} } // e.g., { ai: true, replyTo: messageId }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
