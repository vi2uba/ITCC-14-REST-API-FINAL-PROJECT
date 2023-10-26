const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const barangayRoutes = require('./API/routes/barangay');
const peopleRoutes = require('./API/routes/people');

//Morgan Logs Requests
app.use(morgan('dev'));

//Handles body parsing
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Handles CORS errors
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//Routes that will handle the requestsnp
app.use('/barangay', barangayRoutes);
app.use('/people', peopleRoutes);

//Error Handler
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

})
app.use((error,req,res,next) => {
    res.status(error.status||500);
    res.json({
        error:{
            message: error.message
        }
    })

})

//runs app
module.exports = app;