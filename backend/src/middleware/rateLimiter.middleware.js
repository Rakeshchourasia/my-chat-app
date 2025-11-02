const rateLimit = require('express-rate-limit');

const windowMinutes = parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '1', 10);
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '20', 10);

const apiLimiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000, // minutes
  max: maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, slow down' }
});

module.exports = { apiLimiter };
