const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Barangay = require('../models/barangay_model');
const { json } = require('body-parser');

// Handles GET request to retrieve barangays with specific filters
router.get('/', (req, res, next) => {
    const filters = req.query; // Get the query parameters from the request

    Barangay.find(filters) // Use the filters to search for barangays in the database
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
router.post('/', (req,res,next) =>{
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
router.put('/:barangayID', (req, res, next) => {
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
          res.status(200).json({ message: 'No modifications made, but the Barangay exists' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  

//Handle PATCH requests
router.patch('/:barangayID', (req, res, next) => {
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

router.delete('/:barangayID', (req,res,next) =>{
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