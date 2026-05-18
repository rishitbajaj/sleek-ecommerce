const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inline Custom Authentication Gate Middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'emergency_fallback_secret_key_123');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token execution unauthorized' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'No bearer authorization token supplied' });
  }
};

// @desc    Commit a fresh transaction ledger record to MongoDB
// @route   POST /api/orders
router.post('/', protect, async (req, res) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No items found in outgoing payload' });
  }

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice
    });

    const createdOrder = await order.save();
    console.log(`✨ [Database Log]: Order entry successfully committed to ledger: ${createdOrder._id}`);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('🔥 [Database Fault]: Failed to commit transaction:', error);
    res.status(500).json({ message: `Server transaction ledger fault: ${error.message}` });
  }
});

module.exports = router;