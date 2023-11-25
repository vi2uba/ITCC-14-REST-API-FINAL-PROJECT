const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Barangay = require('../models/barangay_model');

const { apikeyAndJwtAuthMiddleware, adminAuthMiddleware } = require('../middlewares/apikeyAndJwtAuthMiddleware');



const { json } = require('body-parser');


/**
 * @swagger
 * tags:
 *   name: Barangay
 *   description: Endpoints for managing barangay data
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Barangays:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         population:
 *           type: number
 * 
 */

/**
 * @swagger
 * /barangay:
 *   get:
 *     summary: Get a list of barangays with specific filters.
 *     tags: [Barangay]
 *     parameters:
 *       - name: name/exact
 *         in: query
 *         description: Filter by exact name.
 *         schema:
 *           type: string
 *       - name: population/exact
 *         in: query
 *         description: Filter by exact population.
 *         schema:
 *           type: number
 *       - name: population/lt
 *         in: query
 *         description: Filter by population less than.
 *         schema:
 *           type: number
 * 
 *       - name: population/gt
 *         in: query
 *         description: Filter by population greater than.
 *         schema:
 *           type: number
 *     security:
 *      - apiKey: []
 *      - jwt: []
 * 
 *     responses:
 *       200:
 *         description: Successful response.
 *       400:
 *         description: No Matching Person.
 *       500:
 *         description: Internal Server error
 */



/**
 * @swagger
 * /barangay:
 *   post:
 *     summary: Create a new barangay.
 *     tags: [Barangay]
 *     requestBody:
 *       description: Barangay data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               population:
 *                 type: number
 *     security:
 *      - apiKey: []
 *      - jwt: []
 *     responses:
 *       200:
 *         description: Barangay created successfully.
 *       400:
 *         description: Clien error.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /barangay/{barangayID}:
 *   put:
 *     summary: Update a barangay.
 *     tags: [Barangay]
 *     parameters:
 *       - in: path
 *         name: barangayID
 *         required: true
 *         description: ID of the barangay to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated barangay data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               population:
 *                 type: number
 *     security:
 *      - jwt: []
 *     responses:
 *       200:
 *         description: Barangay updated successfully.
 *       500:
 *         description: Internal server error.
 *   patch:
 *     summary: Partially update a barangay.
 *     tags: [Barangay]
 *     parameters:
 *       - in: path
 *         name: barangayID
 *         required: true
 *         description: ID of the barangay to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Partially updated barangay data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               population:
 *                 type: number
 *     security:
 *      - apiKey: []
 *      - jwt: []
 *     responses:
 *       200:
 *         description: Barangay updated successfully.
 *       500:
 *         description: Internal server error.
 *   delete:
 *     summary: Delete a barangay.
 *     tags: [Barangay]
 *     parameters:
 *       - in: path
 *         name: barangayID
 *         required: true
 *         description: ID of the barangay to delete.
 *         schema:
 *           type: string
 *     security:
 *      - apiKey: []
 *      - jwt: []
 *     responses:
 *       200:
 *         description: Barangay deleted successfully.
 *       404:
 *         description: Barangay not found.
 *       500:
 *         description: Internal server error.
 */



// Handles GET request to retrieve barangays with specific filters
router.get('/', apikeyAndJwtAuthMiddleware, async (req, res, next) => {
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

  Barangay.find(filterConditions) // Use the filter conditions to search for barangays in the database
      .exec()
      .then(barangays => {
          if (barangays.length > 0) {
              res.status(200).json(barangays);
          } else {
              res.status(404).json({ message: 'No matching barangays found' });
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: err });
      });
});


//Handles POST requests
router.post('/', apikeyAndJwtAuthMiddleware, adminAuthMiddleware, async (req,res,next) =>{
    const barangay ={
        name: req.body.name,
        population: req.body.population
    }

    //creates new instance based on database model
    const barangay_instance = new Barangay({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        population: req.body.population
    });

    //Sends the data to the server Database
    barangay_instance
    .save()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Hell Yeah!, Handling POST request to /barangay',
            created_barangays: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    
    });

    

});

//Handles PUT requests
router.put('/:barangayID', apikeyAndJwtAuthMiddleware, adminAuthMiddleware, async (req, res, next) => {
    const barangayID = req.params.barangayID;
    const updateOps = {};
  
    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key];
    }
  
    // Use Mongoose's updateOne method to perform a full update.
    Barangay.updateOne({ _id: barangayID }, { $set: updateOps })
      .exec()
      .then(result => {
        if (result.nModified > 0) {
          res.status(200).json({ message: 'Barangay updated successfully' });
        } else {
          res.status(200).json({ message: 'Update Success' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  

//Handle PATCH requests
router.patch('/:barangayID', apikeyAndJwtAuthMiddleware, adminAuthMiddleware, async (req, res, next) => {
    const barangayID = req.params.barangayID;
    const updateOps = {};
  
    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key];
    }
  
    // Use Mongoose's updateOne method to perform a partial update.
    Barangay.updateOne({ _id: barangayID }, { $set: updateOps })
      .exec()
      .then(result => {
        if (result.nModified > 0) {
          res.status(200).json({ message: 'Barangay updated successfully' });
        } else {
          res.status(200).json({ message: 'modifications made, the Barangay exists' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  
  

//Handles DELETE requests

router.delete('/:barangayID', apikeyAndJwtAuthMiddleware, adminAuthMiddleware, async (req,res,next) =>{
    const barangayID = req.params.barangayID;

    Barangay.deleteOne({_id: barangayID})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});

})});


module.exports = router;