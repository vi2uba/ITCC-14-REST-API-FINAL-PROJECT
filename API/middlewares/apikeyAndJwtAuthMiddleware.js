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
    console.log('Decoded username:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// to check if the user is an admin
const adminAuthMiddleware = async (req, res, next) => {
  try {
    // Ensure req.user is available and has the 'level' property
    if (req.user && req.user.level === 'admin') {
      next();
    } else {
      return res.status(403).json({ error: 'Unauthorized - Admin access required' });
    }
  } catch (error) {
    console.error('Error in adminAuthMiddleware:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = { apikeyAndJwtAuthMiddleware, adminAuthMiddleware };
