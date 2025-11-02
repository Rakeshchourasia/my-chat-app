const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  isPrivate: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  meta: { type: Object } // extra config, e.g., { aiEnabled: true }
}, { timestamps: true });

module.exports = mongoose.model('Channel', ChannelSchema);
