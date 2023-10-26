const express = require('express');
const router = express.Router();
const People = require('../models/people_model');
const mongoose = require('mongoose');



// Handles GET request to retrieve people with specific filters
router.get('/', (req, res, next) => {
    const filters = req.query; // Get the query parameters from the request

    People.find(filters) // Use the filters to search for people in the database
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


// Handles POST requests
router.post('/', (req, res, next) => {
    const person = new People({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        residence: req.body.residence
    });

    person
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Person created successfully',
                created_person: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


// Handles PUT requests
router.put('/:personID', (req, res, next) => {
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
router.patch('/:personID', (req, res, next) => {
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
                res.status(200).json({ message: 'No modifications made, but the Person exists' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;

// Handles DELETE requests
router.delete('/:personID', (req, res, next) => {
    const personID = req.params.personID;

    People.deleteOne({ _id: personID })
        .exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({ message: 'Person deleted successfully' });
            } else {
                res.status(404).json({ message: 'Person not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;




module.exports = router;