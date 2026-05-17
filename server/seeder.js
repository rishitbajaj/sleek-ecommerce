const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: "Minimalist Leather Backpack",
    category: "Travel",
    price: 185.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
    description: "Crafted from premium full-grain leather, featuring clean hidden zippers and a dedicated modular laptop compartment.",
    countInStock: 15
  },
  {
    name: "Classic Chronograph Watch",
    category: "Accessories",
    price: 240.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    description: "An understated, modern statement piece built with surgical-grade stainless steel and a genuine Italian leather strap.",
    countInStock: 8
  },
  {
    name: "Wireless Studio Headphones",
    category: "Audio",
    price: 299.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    description: "Immersive sound profile combined with premium active noise cancellation and memory foam earcups for extended listening.",
    countInStock: 12
  },
  {
    name: "Scented Soy Wax Candle",
    category: "Home",
    price: 35.00,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
    description: "Hand-poured candle with notes of cedarwood, amber, and light citrus notes housed in a minimal matte ceramic vessel.",
    countInStock: 25
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('📦 Data Successfully Seeded to MongoDB!');
    process.exit();
  } catch (error) {
    console.error(`Error with data ingestion: ${error.message}`);
    process.exit(1);
  }
};

importData();