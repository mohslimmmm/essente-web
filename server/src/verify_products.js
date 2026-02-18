const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('./models/Product');

dotenv.config({ path: path.join(__dirname, '../.env') });

const verifyDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Product.countDocuments();
        console.log(`Product count: ${count}`);

        const products = await Product.find({}, 'name _id image');
        console.log('Products:', products);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyDB();
