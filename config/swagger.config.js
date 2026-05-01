const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MyApp API',
      version: '1.0.0',
      description: 'API documentation for MyApp',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./router/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;