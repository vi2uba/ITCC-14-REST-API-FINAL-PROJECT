const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Import your Swagger configuration
const jwt = require('jsonwebtoken');
require('dotenv').config();

const barangayRoutes = require('./API/routes/barangay');
const peopleRoutes = require('./API/routes/people');
const userRoutes = require('./API/routes/users');
const loginRoutes = require('./API/routes/login');
const registerRoutes = require('./API/routes/register');
//Connect to MongoAtlas DB
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });






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
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})



//Routes that will handle the requests
app.use('/barangay', barangayRoutes, );
app.use('/people', peopleRoutes, );
app.use('/users', userRoutes, );
app.use('/login', loginRoutes, );
app.use('/register', registerRoutes, );

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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