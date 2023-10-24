const express = require('express');
const app = express();

const barangayRoutes = require('./API/routes/barangay');
const peopleRoutes = require('./API/routes/people');

app.use('/barangay', barangayRoutes);
app.use('/people', peopleRoutes);

module.exports = app;