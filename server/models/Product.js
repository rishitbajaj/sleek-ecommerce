const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  image: { type: String, required: true },
  description: { type: String, required: true },
  countInStock: { type: Number, required: true, default: 10 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);