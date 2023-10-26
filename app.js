const express = require('express');
const app = express();
const morgan = require('morgan');

const barangayRoutes = require('./API/routes/barangay');
const peopleRoutes = require('./API/routes/people');

//Morgan Logs Requests
app.use(morgan('dev'));

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