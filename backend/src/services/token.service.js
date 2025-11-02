const jwt = require('jsonwebtoken');

const createAccessToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyAccessToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = { createAccessToken, verifyAccessToken };
