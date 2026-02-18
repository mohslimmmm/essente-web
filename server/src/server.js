require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://essente:atppRsJgyqd6UoGe@moh.ib5zv.mongodb.net/?appName=moh';

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    // process.exit(1); // Optional: Exit if DB fails, or start server anyway with limited functionality
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (DB Connection Failed)`);
    });
  });
