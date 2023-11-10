const express = require('express');
const router = express.Router();
const User = require('../models/users_model');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      // Successful login
      res.json({ success: true, message: 'Login successful' });
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

module.exports = router;
