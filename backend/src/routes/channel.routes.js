const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth.middleware');
const { createChannel, listChannels } = require('../controllers/channel.controller');

router.use(ensureAuth);
router.post('/', createChannel);
router.get('/', listChannels);

module.exports = router;
