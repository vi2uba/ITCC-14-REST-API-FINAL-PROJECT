const mongoose = require('mongoose');


// Clear Mongoose models
mongoose.models = {};
mongoose.modelSchemas = {};

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:String,
    username:String,
    password:String,
    api_key:String,
    userStatus:Number,
    
});

module.exports = mongoose.model('Users', usersSchema);
