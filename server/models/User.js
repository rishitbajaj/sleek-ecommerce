const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

// FIX: In modern Mongoose async hooks, do not pass or call 'next'. 
// Returning or completing the async execution advances the hook automatically.
userSchema.pre('save', async function () {
  // If the password field hasn't been changed or updated, exit early
  if (!this.isModified('password')) {
    return;
  }
  
  // Hash the password cleanly using standard await execution blocks
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Helper Method: Safely evaluate passwords during login matching
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);