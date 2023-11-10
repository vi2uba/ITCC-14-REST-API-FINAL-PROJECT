const mongoose = require('mongoose');


// Clear Mongoose models
mongoose.models = {};
mongoose.modelSchemas = {};

const peopleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    income: Number,
    years_residing: Number,
    marital_status: String,
    education: String,
    employment: String,
    
    residence_Barangay: {
        type: String,
        ref: 'Barangay', // Reference to the Barangay model
    },
    zone: Number,
});

module.exports = mongoose.model('People', peopleSchema);
