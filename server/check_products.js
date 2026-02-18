const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      const count = await Product.countDocuments();
      console.log(`Product count: ${count}`);
      process.exit();
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
