const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['vetements', 'accessoires', 'maison']
  },
  images: {
    type: [String],
    default: []
  },
  stock: {
    type: Number,
    default: 0
  },
  isNewCollection: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from name
productSchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().split(' ').join('-');
  next();
});

module.exports = mongoose.model('Product', productSchema);
