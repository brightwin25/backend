const express = require('express');
const swaggerJSDocs = require('swagger-jsdoc')
const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./swagger");
const app = express();

const userRoutes = require('./router/user-router');
const categoryRouter = require('./router/category-router');
const errorHandler = require('./middleware/error');

app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Money tracker backend",
            version: '1.0.0'
        },
        servers: [
            {
                api: 'http://localhost:3000/'
            }
        ]
    },
    apis: ['./router/categories.js']
}

const swaggerSpec = swaggerJSDocs(options);
app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/categories', categoryRouter);
app.use(errorHandler);

module.exports = app;