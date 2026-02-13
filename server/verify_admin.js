const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@essente.com' });
    if (admin) {
      console.log('Admin user found:', admin.email);
    } else {
      console.log('Admin user NOT found');
    }
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
