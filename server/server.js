const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose'); // Pull Mongoose directly into the driver

// Route File Imports
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// INLINE SELF-CONTAINED DATABASE CONNECTION BLOCK
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/sleek-store';
console.log('Initiating core connection sequence to MongoDB Engine...');

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected Perfectly to sleek-store Database Instance'))
  .catch((err) => {
    console.error('🔥 CRITICAL MONGO CONFIG CONNECTION REFUSED:', err.message);
    console.log('Ensure MongoDB Compass or your background mongo services are currently active.');
  });

// Application Routing Enclaves
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API Node Engine Running Efficiently...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in production layout mode on port ${PORT}`);
});