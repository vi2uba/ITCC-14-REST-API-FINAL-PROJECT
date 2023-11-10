const express = require('express');
const router = express.Router();
const User = require('../models/users_model'); // Update the model path if needed

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
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
