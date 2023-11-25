const jwt = require('jsonwebtoken');
const User = require('../models/users_model');
require('dotenv').config();

const apikeyAndJwtAuthMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.header("api_key");
    const token = req.header("Authorization");

    if (!apiKey) {
      return res.status(401).json({ error: 'API key is missing' });
    }

    // Validate the API key against the database
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // Log the decoded username for debugging
    console.log('Decoded username:', decoded.username);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const adminAuthMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.userId);

  console.log('User object in adminAuthMiddleware:', user);

  if (user && user.level === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Unauthorized - Admin access required' });
  }
};

module.exports = { apikeyAndJwtAuthMiddleware, adminAuthMiddleware };
