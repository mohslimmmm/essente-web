const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Order = require('./models/Order');

dotenv.config({ path: path.join(__dirname, '../.env') });

const verifyOrders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const count = await Order.countDocuments();
        console.log(`Order count: ${count}`);

        if (count > 0) {
            const orders = await Order.find({}, 'user totalPrice status');
            console.log('Orders:', orders);
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyOrders();
