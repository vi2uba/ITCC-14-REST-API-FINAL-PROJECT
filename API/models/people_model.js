const mongoose = require('mongoose');

// Clear Mongoose models
mongoose.models = {};
mongoose.modelSchemas = {};

const peopleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    residence: {
        type: String,
        ref: 'Barangay', // Reference to the Barangay model
    },
});

module.exports = mongoose.model('People', peopleSchema);
