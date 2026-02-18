const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const validate = require('../shared/validateResource');
const { registerSchema, loginSchema } = require('../schema/auth.schema.zod');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: { success: false, message: 'Too many login attempts, please try again later' }
});

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', loginLimiter, validate(loginSchema), login);
router.get('/me', protect, getMe);

module.exports = router;
