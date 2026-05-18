const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate structural tokens
const generateToken = (id) => {
  // Graceful fallback to prevent crashes if JWT_SECRET isn't picked up by dotenv
  const secret = process.env.JWT_SECRET || 'emergency_fallback_secret_key_123';
  return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

// @desc    Register a new user with Explicit Debugging Logs
// @route   POST /api/users/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Debug Log: View exactly what the server receives from React
  console.log('--- Auth Registration Request Received ---');
  console.log('Payload Data Received:', { name, email, password: password ? '[HIDDEN]' : 'MISSING' });

  try {
    // 1. Check for missing payload items explicitly
    if (!name || !email || !password) {
      console.warn('❌ Registration rejected: Missing required profile fields.');
      return res.status(400).json({ 
        message: 'Registration failed. Please provide a Name, Email, and Password.' 
      });
    }

    // 2. Query collection to look for active duplicate email records
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.warn(`❌ Registration rejected: Email [${email}] is already registered in the database.`);
      return res.status(400).json({ message: 'A user account with this email already exists.' });
    }

    // 3. Commit new registration profile directly to local MongoDB collection
    console.log('Saving user document to MongoDB database collection...');
    const user = await User.create({ name, email, password });
    console.log('✅ User document successfully written to database. ID:', user._id);

    // 4. Formulate response payload with secure JSON Web Token
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token
    });

  } catch (error) {
    // CRITICAL FIX: Print the exact system error stacktrace down into your backend console window
    console.error('🔥 CRITICAL REGISTRATION DATABASE FAULT STACKTRACE:');
    console.error(error);

    // Stream the actual root error explanation straight back out onto the React client dashboard interface
    res.status(500).json({ 
      message: `Backend Server Error: ${error.message || 'Unknown database indexing fault.'}` 
    });
  }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('--- Auth Login Request Received ---');

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('🔥 LOGIN EXCEPTION FAULT STACKTRACE:', error);
    res.status(500).json({ message: `Backend Login Server Error: ${error.message}` });
  }
});

module.exports = router;