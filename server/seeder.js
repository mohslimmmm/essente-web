const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import into DB
const importData = async () => {
  try {
    console.log('Starting data import...'); // Debug log
    const adminUser = {
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@essente.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    };

    console.log('Connecting to DB with URI:', process.env.MONGO_URI); // Debug log (ensure env loaded)

    // Check if admin already exists
    const userExists = await User.findOne({ email: adminUser.email });
    
    if (userExists) {
        console.log('Admin user already exists.');
        process.exit();
    }

    console.log('Creating user...'); // Debug log
    await User.create(adminUser);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany({ email: process.env.ADMIN_EMAIL || 'admin@essente.com' });
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
    console.log('Please use -i to import or -d to delete');
    process.exit();
}
