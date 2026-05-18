const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // 1. Import User Routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🍃 MongoDB connected successfully!'))
  .catch((err) => console.error('Database connection error:', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // 2. Register Auth Routes

// Base Route
app.get('/', (req, res) => {
  res.send('E-commerce API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server navigating smoothly on port ${PORT}`));