const express = require('express');
const app = express();

const userRoutes = require('./router/user-router');
const categoryRouter = require('./router/category-router');
const errorHandler = require('./middleware/error');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/categories', categoryRouter);
app.use(errorHandler);

module.exports = app;