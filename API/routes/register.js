// routes/register.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/users_model');
require('dotenv').config();

// Route to register a new user
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username is already taken' });
    }

    // Create a new user
    const api_key = generateApiKey();
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password,
      api_key,
    });

    const savedUser = await newUser.save();

    const token = generateJwtToken(savedUser);

      // Successful registration
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: { _id: savedUser._id, username: savedUser.username, api_key, token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Function to generate a random API key
function generateApiKey() {
  return Math.random().toString(36).substr(2, 20);
}

// Function to generate a JWT token
function generateJwtToken(user) {
  return jwt.sign({ userId: user._id, username: user.username }, process.env.SECRETKEY, { expiresIn: '1h' });
}

module.exports = router;
