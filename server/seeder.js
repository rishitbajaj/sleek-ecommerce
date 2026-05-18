const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Configure environment engine to read MongoDB cluster parameters
dotenv.config();

const sampleProducts = [
  {
    name: "Vélo Studio Modular Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Waterproof ballistic nylon shell featuring tactical architectural internal organizing pods and hidden magnetic security document slots.",
    price: 185.00,
    rating: 4.9
  },
  {
    name: "Architect Matte Chronograph",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Brushed matte surgical steel case housing a precision Japanese movement module, fitted with a vegetable-tanned raw leather strap.",
    price: 320.00,
    rating: 4.8
  },
  {
    name: "AeroFrame Minimalist Eyewear",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Zero-weight laser-cut titanium frames engineered with custom polarized UV400 protective lenses for everyday modern clarity.",
    price: 145.00,
    rating: 4.7
  },
  {
    name: "MonoWeave Minimalist Sneakers",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop",
    category: "Footwear",
    description: "Breathable recycled knit yarn silhouette structured over an ergonomic impact-dispersing zero-density cellular compound sole unit.",
    price: 160.00,
    rating: 4.9
  },
  {
    name: "Sleek Aluminum Card Wallet",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Aerospace-grade RFID-blocking aluminum plate casing featuring a patented structural spring mechanism for rapid card fan access.",
    price: 65.00,
    rating: 4.6
  },
  {
    name: "Studio Merino Wool Knit",
    image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Spun from 100% fine micron grade extra-soft merino fibers, delivering exceptional thermal self-regulation and a refined profile layout.",
    price: 195.00,
    rating: 4.8
  },
  {
    name: "HydroFlask Matte Thermal Cell",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Double-walled vacuum insulated structural container finished in an anti-scratch tactile matte powder coat finish.",
    price: 48.00,
    rating: 4.7
  },
  {
    name: "Modular Tech Organiser Case",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    category: "Travel",
    description: "Elastomeric retention layout loops configured inside a rigid crushproof shell designed to house performance storage nodes and cables.",
    price: 55.00,
    rating: 4.5
  },
  {
    name: "Raw Selvage Denim Jacket",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Unwashed 14.5oz loomstate structural denim framework featuring custom internal chain-stitch details and heavy reinforced steel hardware.",
    price: 240.00,
    rating: 4.9
  },
  {
    name: "Premium Desk Mat — Charcoal",
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop",
    category: "Lifestyle",
    description: "Premium pressed renewable merino felt base combined with a rich textured vegan leather deck layer for tactile input tracking glide.",
    price: 78.00,
    rating: 4.8
  },
  {
    name: "Precision Aluminum Pen",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
    category: "Accessories",
    description: "Solid CNC-machined structural aluminum build housing an ultra-fluid pressurized liquid ink flow ink delivery cartridge layout.",
    price: 42.00,
    rating: 4.6
  },
  {
    name: "Urban Minimalist Trench Coat",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop",
    category: "Apparel",
    description: "Windproof and water-repellent performance outer shell fabric woven into a sharp, structural silhouette with clean layout seams.",
    price: 380.00,
    rating: 5.0
  }
];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/sleek-store';
    
    console.log('Connecting to MongoDB Engine for data seeding...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected.');

    // 1. Flush old matching records to clear memory allocations
    console.log('Flushing existing products catalog data...');
    await Product.deleteMany();
    console.log('🗑️ Legacy records wiped.');

    // 2. Insert new extended item inventory data structural blocks
    console.log(`Injecting ${sampleProducts.length} premium design items into MongoDB...`);
    await Product.insertMany(sampleProducts);
    console.log('🚀 Database seeding operation completed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('🔥 SEEDING OPERATION CRITICAL FAILURE:', error);
    process.exit(1);
  }
};

seedDatabase();