const Channel = require('../models/Channel.model');
const slugify = require('slugify');

exports.createChannel = async (req, res, next) => {
  try {
    const { name, isPrivate } = req.body;
    if (!name) return res.status(400).json({ error: 'Name required' });
    const slug = slugify(name, { lower: true, strict: true });

    const exists = await Channel.findOne({ slug });
    if (exists) return res.status(400).json({ error: 'Channel already exists' });

    const channel = await Channel.create({ name, slug, isPrivate, members: isPrivate ? [req.user._id] : [] });
    res.json(channel);
  } catch (err) {
    next(err);
  }
};

exports.listChannels = async (req, res, next) => {
  try {
    // Public channels plus private channels where user is member
    const channels = await Channel.find({
      $or: [
        { isPrivate: false },
        { members: req.user._id }
      ]
    }).lean();
    res.json(channels);
  } catch (err) {
    next(err);
  }
};
