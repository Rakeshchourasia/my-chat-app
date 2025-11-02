const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth.middleware');
const { postMessage, getChannelMessages } = require('../controllers/message.controller');

router.use(ensureAuth);
router.post('/', postMessage);
router.get('/channel/:channelId', getChannelMessages);

module.exports = router;
