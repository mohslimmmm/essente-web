const jwt = require('jsonwebtoken');
const config = require('../config/env');

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret || 'secret123', {
    expiresIn: config.jwtExpiresIn
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + config.jwtCookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: config.env === 'production'
  };

  res.status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      data: {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
      }
    });
};

module.exports = { generateToken, sendTokenResponse };
