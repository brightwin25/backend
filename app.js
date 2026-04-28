const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
// const swaggerSpec = require("./swagger");
const app = express();

const userRoutes = require('./router/user.router');
const categoryRouter = require('./router/category.router');
const errorHandler = require('./middleware/error.middleware');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRoutes);
app.use('/categories', categoryRouter);
app.use(errorHandler);

module.exports = app;