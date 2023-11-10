const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

const Users = require('../models/users_model');
const { json } = require('body-parser');



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users data
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         api_key:
 *           type: string
 *         userStatus:
 *           type: number
 * 
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [Users]
 *     requestBody:
 *       description: User registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Client error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login with username and password.
 *     tags: [Users]
 *     requestBody:
 *       description: User login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     
 *     responses:
 *       200:
 *         description: Login successful.
 *       401:
 *         description: Invalid username or password.
 *       500:
 *         description: Internal server error.
 */



// Handles POST request for user login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await Users.findOne({ username, password });

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

// Handles POST request for user registration
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await Users.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username is already taken' });
    }

    // Create a new user
    const newUser = new Users({ username, password });
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully', user: savedUser });
  } catch (error) {
    // Handle database errors
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


module.exports = router;