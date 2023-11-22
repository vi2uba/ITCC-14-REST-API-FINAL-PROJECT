const express = require('express');
const router = express.Router();
const People = require('../models/people_model');
const Barangay = require('../models/barangay_model');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

//Java Web Token Authentication
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, 'yourSecretKey', (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      // Attach the user to the request object for future use (optional)
      req.user = user;
  
      // Call next() to allow the request to continue to the route
      next();
    });
  }

/**
 * @swagger
 * tags:
 *   name: People
 *   description: Endpoints for managing people data
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     People:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         age:
 *           type: number
 *         income:
 *           type: number
 *         years_residing:
 *           type: number
 *         marital_status:
 *           type: string
 *         education:
 *           type: string
 *         employment:
 *           type: string
 *         residence_Barangay:
 *           type: string
 *         zone:
 *           type: number
 */
/**
 * @swagger
 * /people:
 *   get:
 *     summary: Get a list of people with specific filters.
 *     tags: [People]
 *     parameters:
 *       - name: name/exact
 *         in: query
 *         description: Filter by name.
 *         schema:
 *           type: string
 *  
 *       - name: age/exact
 *         in: query
 *         description: Filter by exact age.
 *         schema:
 *           type: number
 * 
 *       - name: income/exact
 *         in: query
 *         description: Filter by exact income.
 *         schema:
 *           type: number
 * 
 *       - name: years_residing/exact
 *         in: query
 *         description: Filter by exact years residing.
 *         schema:
 *           type: number
 * 
 *       - name: marital_status/exact
 *         in: query
 *         description: Filter by Marital Status.
 *         schema:
 *           type: string
 * 
 *       - name: education/exact
 *         in: query
 *         description: Filter by Education.
 *         schema:
 *           type: string
 * 
 *       - name: employment/exact
 *         in: query
 *         description: Filter by Employment.
 *         schema:
 *           type: string
 * 
 *       - name: residence_Barangay/exact
 *         in: query
 *         description: Filter by exact residence.
 *         schema:
 *           type: string
 * 
 *       - name: age/lt
 *         in: query
 *         description: Filter by age less than.
 *         schema:
 *           type: number
 * 
 *       - name: age/gt
 *         in: query
 *         description: Filter by age greater than.
 *         schema:
 *           type: number
 * 
 *       - name: income/lt
 *         in: query
 *         description: Filter by income less than.
 *         schema:
 *           type: number
 * 
 *       - name: income/gt
 *         in: query
 *         description: Filter by income greater than.
 *         schema:
 *           type: number
 * 
 *       - name: years_residing/lt
 *         in: query
 *         description: Filter by years_residing less than.
 *         schema:
 *           type: number
 * 
 *       - name: years_residing/gt
 *         in: query
 *         description: Filter by years_residing greater than.
 *         schema:
 *           type: number
 * 
 *     security:
 *      - jwt: []
 *        
 *     responses:
 *       200:
 *         description: Successful response.
 *       400:
 *         description: No Matching Person.
 *       500:
 *         description: Internal Server error.
 */

/**
 * @swagger
 * /people:
 *   post:
 *     summary: Create a new person.
 *     tags: [People]
 *     requestBody:
 *       description: Person data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               income:
 *                 type: number
 *               years_residing:
 *                 type: number
 *               marital_status:
 *                 type: string
 *               education:
 *                 type: string
 *               employment:
 *                 type: string
 *               residence_Barangay:
 *                 type: string
 *               zone:
 *                 type: string
 * 
 *     security:
 *      - jwt: []
 *     responses:
 *       201:
 *         description: Person created successfully.
 *       404:
 *         description: residence_Barangay not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /people/{personID}:
 *   put:
 *     summary: Update a person.
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: personID
 *         required: true
 *         description: ID of the person to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated person data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               income:
 *                 type: number
 *               years_residing:
 *                 type: number
 *               marital_status:
 *                 type: string
 *               education:
 *                 type: string
 *               employment:
 *                 type: string
 *               residence_Barangay:
 *                 type: string
 *               zone:
 *                 type: string
 *     security:
 *      - jwt: []
 *     responses:
 *       200:
 *         description: Person updated successfully.
 *       404:
 *         description: Person not found.
 *       500:
 *         description: Internal server error.
 *   patch:
 *     summary: Partially update a person.
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: personID
 *         required: true
 *         description: ID of the person to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Partially updated person data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               income:
 *                 type: number
 *               years_residing:
 *                 type: number
 *               marital_status:
 *                 type: string
 *               education:
 *                 type: string
 *               employment:
 *                 type: string
 *               residence_Barangay:
 *                 type: string
 *               zone:
 *                 type: string
 *     security:
 *      - jwt: []
 *     responses:
 *       200:
 *         description: Person updated successfully.
 *       404:
 *         description: Person not found.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a person.
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: personID
 *         required: true
 *         description: ID of the person to delete.
 *         schema:
 *           type: string
 * 
 *     security:
 *      - jwt: []
 *     responses:
 *       200:
 *         description: Person deleted successfully.
 *       404:
 *         description: Person not found.
 *       500:
 *         description: Internal server error.
 */

// Handles GET request to retrieve people with specific filters
router.get('/', authenticateJWT, async (req, res, next) => {
    const filters = req.query; // Get the query parameters from the request

    const filterConditions = {};

    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const value = filters[key];

            // Split the key to separate the field name and the condition
            const [field, condition] = key.split('/');

            if (condition === 'exact') {
                // For exact match (for both string and numeric fields)
                filterConditions[field] = value;
            } else if (condition === 'lt') {
                // For less than (numeric fields only)
                const numericValue = parseFloat(value);
                if (!isNaN(numericValue)) {
                    filterConditions[field] = { $lt: numericValue };
                }
            } else if (condition === 'gt') {
                // For greater than (numeric fields only)
                const numericValue = parseFloat(value);
                if (!isNaN(numericValue)) {
                    filterConditions[field] = { $gt: numericValue };
                }
            }
        }
    }

    People.find(filterConditions)
        .exec()
        .then(people => {
            if (people.length > 0) {
                res.status(200).json(people);
            } else {
                res.status(404).json({ message: 'No matching people found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});






// Handles POST requests for adding a new person
router.post('/', authenticateJWT, async (req, res, next) => {
    const person = new People({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        income: req.body.income,
        years_residing: req.body.years_residing,
        marital_status: req.body.marital_status,
        education: req.body.education,
        employment: req.body.employment,
        residence_Barangay: req.body.residence_Barangay,
        zone: req.body.zone
    });

    // Find the corresponding barangay and update its population
    try {
        const barangay = await Barangay.findOne({ name: req.body.residence_Barangay });
        if (barangay) {
            // Update the population of the barangay
            barangay.population += 1;

            // Save the updated barangay and the new person
            await Promise.all([person.save(), barangay.save()]);

            res.status(200).json({
                message: 'Person created successfully',
                created_person: person,
            });
        } else {
            res.status(404).json({ message: 'residence_Barangay not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});



// Handles PUT requests
router.put('/:personID', authenticateJWT, async(req, res, next) => {
    const personID = req.params.personID;
    const updateOps = {};

    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }

    // Use Mongoose's updateOne method to perform a full update.
    People.updateOne({ _id: personID }, { $set: updateOps })
        .exec()
        .then(result => {
            if (result.nModified > 0) {
                res.status(200).json({ message: 'Person updated successfully' });
            } else {
                res.status(200).json({ message: 'modifications made, the Person exists' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


// Handle PATCH requests
router.patch('/:personID', authenticateJWT, async(req, res, next) => {
    const personID = req.params.personID;
    const updateOps = {};

    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key];
    }

    // Use Mongoose's updateOne method to perform a partial update.
    People.updateOne({ _id: personID }, { $set: updateOps })
        .exec()
        .then(result => {
            if (result.nModified > 0) {
                res.status(200).json({ message: 'Person updated successfully' });
            } else {
                res.status(200).json({ message: 'Update Success' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;

// Handles DELETE requests for removing a person
router.delete('/:personID', authenticateJWT, async (req, res, next) => {
    const personID = req.params.personID;

    try {
        const person = await People.findById(personID);
        if (person) {
            // Find the corresponding barangay and update its population
            const barangay = await Barangay.findOne({ name: person.residence_Barangay });
            if (barangay) {
                // Update the population of the barangay
                barangay.population -= 1;
                await barangay.save();
            }

            // Use the `deleteOne` method to delete the person
            await People.deleteOne({ _id: personID });
            res.status(200).json({ message: 'Person deleted successfully' });
        } else {
            res.status(404).json({ message: 'Person not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});




module.exports = router;




module.exports = router;