const mongoose = require('mongoose');


// Clear Mongoose models
mongoose.models = {};
mongoose.modelSchemas = {};

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:String,
    username:{type:String,required:true},
    password:{type:String,required:true},
    api_key:{type:String,required:true},
    level:{type:String, default: 'pleb'},
    
});

module.exports = mongoose.model('Users', usersSchema);
