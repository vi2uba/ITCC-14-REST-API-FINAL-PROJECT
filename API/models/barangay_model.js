const mongoose = require('mongoose');

const barangaySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    population: {type: Number, required: true},
});

module.exports = mongoose.model('Barangay', barangaySchema);