const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password:String
  // ... other user properties
});

// Register User model with Mongoose
const User = mongoose.model('User', userSchema);

module.exports = User;