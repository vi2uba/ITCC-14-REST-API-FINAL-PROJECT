const mongoose = require('mongoose');
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
