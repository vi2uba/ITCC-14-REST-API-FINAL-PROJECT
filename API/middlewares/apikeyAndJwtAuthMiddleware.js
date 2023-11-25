const jwt = require('jsonwebtoken');
const User = require('../models/users_model');
require('dotenv').config();
const adminAuthMiddleware = require('./adminAuthMiddleware');

const apikeyAndJwtAuthMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.header("api_key");
    const token = req.header("Authorization");

    if (!apiKey) {
      return res.status(401).json({ error: 'API key is missing' });
    }

    // Validate the API key against the database
    const user = await User.findOne({ api_key: apiKey });

    if (user) {
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.SECRETKEY);
          req.user = decoded;
          next();
        } catch (jwtError) {
          return res.status(401).json({ error: 'Invalid JWT' });
        }
      } else {
        return res.status(401).json({ error: 'JWT is missing' });
      }
    } else {
      return res.status(401).json({ error: 'Invalid API key' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { apikeyAndJwtAuthMiddleware, adminAuthMiddleware };
