const express = require('express');
const { chatWithAI } = require('../controllers/aiController');
// const { protect } = require('../middleware/auth');

const router = express.Router();

// router.use(protect);

router.post('/chat', chatWithAI);

module.exports = router;
