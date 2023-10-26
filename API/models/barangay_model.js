const mongoose = require('mongoose');

const barangaySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    population: Number
});

module.exports = mongoose.model('Barangay', barangaySchema);