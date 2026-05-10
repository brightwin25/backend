const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.config');
// const swaggerSpec = require("./swagger");
const app = express();

const loginRoutes = require('./router/index');
const userRoutes = require('./router/user.router');
const categoryRouter = require('./router/category.router');
const errorHandler = require('./middleware/error.middleware');
const { auth } = require('./middleware/auth.middleware');
const requestLogger = require('./middleware/request.logger.middleware');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(requestLogger);

app.use('/', loginRoutes);
app.use('/users', auth, userRoutes);
app.use('/categories', auth, categoryRouter);
app.use(errorHandler);

module.exports = app;