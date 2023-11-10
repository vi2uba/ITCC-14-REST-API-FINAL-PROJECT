const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const jsYaml = require('js-yaml');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Specify the OAS version
    info: {
      title: 'Barangay Census API',
      version: '1.0.0',
      description: 'An API that allows Barangays to Add people and and barangays and calculate the population automatically',
      termsOfService: 'http://swagger.io/terms/',
      contact: {email:'20180015014@my.xu.edu.ph'},
      license: {name:'Node Js Licence', url:'https://github.com/nodejs/node/blob/main/LICENSE'},
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components:{securitySchemes:{
    apiKey:{
      type: 'apiKey',
      name: 'APIKey',
      in: 'header'}}}
  },
  apis: [
    './API/routes/barangay.js',
    './API/routes/people.js',
    './API/routes/users.js',
    './API/routes/login.js',
    './API/routes/register.js',
  ],
  
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Convert the Swagger JSON to YAML
const swaggerYaml = jsYaml.dump(swaggerSpec);

// Save the Swagger YAML to a file
fs.writeFileSync('swagger.yaml', swaggerYaml);

module.exports = swaggerSpec;
