const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const products = [
  {
    name: "Skincare Set / Routine Soin",
    description: "Complete skincare routine for daily care. Includes cleanser, toner, and moisturizer.",
    price: 125.00,
    category: "Soin",
    image: "/images/Product flatlay.jpg",
    isNewCollection: true,
    stock: 50
  },
  {
    name: "Leather Wallet + Watch",
    description: "Premium leather wallet and classic timepiece set.",
    price: 180.00,
    category: "Accessoires",
    image: "/images/Quality wallet and watch.jpg",
    isNewCollection: true,
    stock: 30
  },
  {
    name: "Minimal Bath Set",
    description: "Luxurious bathroom essentials for a spa-like experience.",
    price: 90.00,
    category: "Maison",
    image: "/images/Minimal bathroom 2.jpg",
    isNewCollection: true,
    stock: 20
  },
  {
    name: "Bedroom Comfort Bundle",
    description: "Soft linens and cozy pillows for the perfect sleep.",
    price: 250.00,
    category: "Maison",
    image: "/images/bedroom.jpg",
    isNewCollection: true,
    stock: 15
  },
  {
    name: "Organized Desk Setup",
    description: "Minimalist desk organizer and accessories.",
    price: 85.00,
    category: "Maison",
    image: "/images/Desk accessories.jpg",
    isNewCollection: false,
    stock: 40
  },
  {
    name: "Capsule Wardrobe Basics",
    description: "Essential clothing pieces for a versatile wardrobe.",
    price: 200.00,
    category: "Vêtements",
    image: "/images/Capsule wardrobe.jpg",
    isNewCollection: false,
    stock: 25
  }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Products cleared');

        // Insert new products
        for (const product of products) {
            try {
                await Product.create(product);
                console.log(`Created: ${product.name}`);
            } catch (err) {
                console.error(`Failed to create ${product.name}:`, err.message);
            }
        }
        console.log('Products imported');

        process.exit();
    } catch (err) {
        console.error("Seeder Error:", err);
        process.exit(1);
    }
};

seedDB();
