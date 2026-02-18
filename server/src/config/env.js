const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '90d',
  jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN || 90,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
