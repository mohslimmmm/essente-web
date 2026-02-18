const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

// Shared Middleware
const errorHandler = require('./middleware/error.middleware');

// Module Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(cookieParser()); // Parse cookies
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Essenté API' });
});

// Mount Module Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payment', require('./routes/paymentRoutes'));
// app.use('/api/v1/webhook', require('./routes/webhookRoutes')); // Disabled for now

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
