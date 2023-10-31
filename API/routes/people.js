const express = require('express');
const router = express.Router();
const People = require('../models/people_model');
const Barangay = require('../models/barangay_model');
const mongoose = require('mongoose');



// Handles GET request to retrieve people with specific filters
router.get('/', (req, res, next) => {
    const filters = req.query; // Get the query parameters from the request

    const filterConditions = {};

    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            const value = parseInt(filters[key]); // Convert the value to an integer

            // Split the key to separate the field name and the condition
            const [field, condition] = key.split('_');

            if (condition === 'exact') {
                // For exact match
                filterConditions[field] = value;
            } else if (condition === 'lt') {
                // For less than
                filterConditions[field] = { $lt: value };
            } else if (condition === 'gt') {
                // For greater than
                filterConditions[field] = { $gt: value };
            }
        }
    }

    People.find(filterConditions) // Use the filter conditions to search for people in the database
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
router.post('/', async (req, res, next) => {
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

// Handles DELETE requests for removing a person
router.delete('/:personID', async (req, res, next) => {
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