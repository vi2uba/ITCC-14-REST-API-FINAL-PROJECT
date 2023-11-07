const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Specify the OAS version
    info: {
      title: 'Barangay Census API',
      version: '1.0.0',
      description: 'An API that allows Barangays to Add people and and barangays and calculate the population automatically',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: [
    './API/routes/barangay.js',
    './API/routes/people.js',
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
