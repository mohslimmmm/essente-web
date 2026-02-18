const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '.env') });
console.log("Loading .env from:", path.join(__dirname, '.env'));
console.log("MONGO_URI:", process.env.MONGO_URI ? "Defined" : "Undefined");


// Logging setup
const logFile = path.join(__dirname, 'debug_restore.log');
const log = (msg) => {
    const timestamp = new Date().toISOString();
    const logMsg = `[${timestamp}] ${msg}\n`;
    console.log(msg);
    try {
        fs.appendFileSync(logFile, logMsg);
    } catch (e) {
        console.error("Failed to write to log file:", e);
    }
};

// Clear previous log
try { fs.writeFileSync(logFile, ''); } catch(e) {}

log("Starting restore script...");

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://essente:atppRsJgyqd6UoGe@moh.ib5zv.mongodb.net/?appName=moh";

mongoose.connect(MONGO_URI)
    .then(() => log("Connected to MongoDB"))
    .catch(err => {
        log(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    });

const images = [
    "A_side_by_side_comparison_image__On_the_left__budget_items_are_styled_to_appear_luxurious__On_the_ri.png",
    "Bedroom luxury tips.jpg",
    "Bedroom luxury tips.png",
    "Book + candle.jpg",
    "Capsule wardrobe.jpg",
    "Chic Innovative Logo for 'blenda' App.png",
    "Curtains with sunlight.jpg",
    "Designer (1).png",
    "Designer (2).png",
    "Designer (3).png",
    "Designer.png", 
    "Desk accessories.jpg",
    "Elegant Logo with Interlocking Fluid Shapes.png",
    "Evening routine.jpg",
    "Everyday carry items.jpg",
    "Living room corner.jpg",
    "Minimal bathroom 2.jpg",
    "Minimal closet organized.jpg",
    "Minimal sofa with plant.jpg",
    "Modern 'Essenté' Logo with Vibrant Colors.png",
    "Organized drawer.jpg",
    "Plant on table.jpg",
    "Product flatlay.jpg",
    "Product flatlay2.jpg",
    "Quality wallet and watch.jpg",
    "Window with sunlight.jpg",
    "bedroom.jpg",
    "gemini-2.5-flash-image_a_surreal_and_vibrant_cinematic_photo_of_luxury_everyday_carry_essentials_flat_l-0 (1).jpg",
    "gemini-2.5-flash-image_a_surreal_and_vibrant_cinematic_photo_of_luxury_everyday_carry_essentials_flat_l-0.jpg",
    "gemini-2.5-flash-image_a_surreal_and_vibrant_cinematic_photo_of_luxury_minimal_coffee_moment_white_cera-0.jpg",
    "gemini-2.5-flash-image_a_surreal_and_vibrant_cinematic_photo_of_minimal_luxury_bedroom_interior_design_-0.jpg",
    "gemini-2.5-flash-image_a_surreal_and_vibrant_cinematic_photo_of_minimal_luxury_bedroom_interior_white_l-0.jpg",
    "gemini-2.5-flash-image_a_surreal_and_vibrant_cinematic_photo_of_minimalist_home_interior_corner_modern_-0 (1).jpg",
    "gemini-2.5-flash-image_a_surreal_and_vibrant_cinematic_photo_of_minimalist_home_interior_corner_modern_-0.jpg",
    "gemini-2.5-flash-image_a_surreal_and_vibrant_cinematic_photo_of_minimalist_luxury_home_office_desk_whit-0.jpg",
    "lucid-origin_a_surreal_and_vibrant_cinematic_photo_of_minimal_luxury_bedroom_interior_white_l-0.jpg",
    "minimal bathroom.jpg"
];

const getCategory = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('bedroom') || lower.includes('bed')) return 'bedroom';
    if (lower.includes('living') || lower.includes('sofa') || lower.includes('curtain') || lower.includes('corner')) return 'living';
    if (lower.includes('office') || lower.includes('desk') || lower.includes('book')) return 'office';
    if (lower.includes('bathroom')) return 'accessories';
    return 'accessories';
};

const getPrice = () => Math.floor(Math.random() * (500 - 50 + 1) + 50);

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const cleanName = (filename) => {
    let name = filename.split('.')[0];
    name = name.replace(/_/g, ' ').replace(/-/g, ' ');
    name = name.replace(/gemini.*image/i, '');
    name = name.replace(/lucid-origin/i, '');
    name = name.replace(/\d+$/, '');
    name = name.trim();
    if (name.length < 3) name = "Luxury Item";
    return capitalize(name);
};

const restoreProducts = async () => {
    try {
        const validImages = images.filter(img => !img.toLowerCase().includes('logo') && !img.includes('comparison'));
        log(`Found ${validImages.length} valid images to process.`);

        await Product.deleteMany({});
        log('Cleared existing products');

        const seenNames = new Set();
        let successCount = 0;
        let failCount = 0;

        for (const img of validImages) {
            let name = cleanName(img);
            if (seenNames.has(name)) {
                name = `${name} ${Math.floor(Math.random() * 1000)}`;
            }
            seenNames.add(name);

            const productData = {
                name: name,
                description: `Experience the essence of luxury with our ${name}. Crafted with precision and designed for the modern minimalist home.`,
                price: getPrice(),
                category: getCategory(name),
                image: `/images/${img}`,
                stock: 15,
                isNewCollection: Math.random() > 0.7,
                variants: [] // Initialize empty variants array
            };

            try {
                await Product.create(productData);
                successCount++;
            } catch (err) {
                log(`Failed to create product "${name}": ${err.message}`);
                if (err.errors) {
                    Object.keys(err.errors).forEach(key => {
                        log(`  - ${key}: ${err.errors[key].message}`);
                    });
                }
                failCount++;
            }
        }

        log(`Restore complete. Success: ${successCount}, Failed: ${failCount}`);
        
        // Final count check
        const total = await Product.countDocuments();
        log(`Total products in DB: ${total}`);

        process.exit(0);
    } catch (err) {
        log(`Critical Error: ${err.message}`);
        console.error(err);
        process.exit(1);
    }
};

restoreProducts();
