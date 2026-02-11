const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Import routes (to be created)
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const aiRoutes = require('./routes/aiRoutes');

const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

app.use(morgan('dev'));

// Swagger Documentation
// const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Essenté API' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/ai', aiRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
