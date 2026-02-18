const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    index: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  compareAtPrice: {
    type: Number
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    index: true
  },
  image: {
    type: String,
    required: [true, 'Please add a main image']
  },
  images: {
    type: [String],
    default: []
  },
  stock: {
    type: Number,
    default: 0
  },
  // Senior Approach: SKU (Stock Keeping Unit)
  variants: [{
    sku: { type: String, required: true, unique: true }, // Indispensable pour la logistique
    combination: { 
      size: String, 
      color: String 
    },
    price: { type: Number, required: true }, // Le prix réel de cette variante
    stock: { type: Number, required: true, min: 0 }
  }],
  isNewCollection: {
    type: Boolean,
    default: false
  },
  averageRating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Amélioration du slug (plus robuste que split/join)
productSchema.pre('validate', function(next) {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
