const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth'); // We need to create this middleware

const router = express.createServer ? express.createServer() : express.Router(); // robust check but express.Router() is standard

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
