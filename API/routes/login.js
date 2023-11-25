const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users_model');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // Successful login
      const token = generateToken(user.username); // Generate JWT token

      res.json({
        success: true,
        message: 'Login successful',
        api_key: user.api_key,
        JavaWebToken: token,
      });
    } else {
      // Invalid credentials
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    // Handle database errors
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Function to generate JWT token
const generateToken = (username) => {
                              // Uses the secret key from the .env file
  const token = jwt.sign({ username }, process.env.SECRETKEY, { expiresIn: '1200s' }); // Set token expiration time

  return token;
};

module.exports = router;
