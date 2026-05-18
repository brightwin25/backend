const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.config');
// const swaggerSpec = require("./swagger");
const app = express();

const loginRoutes = require('./router/index');
const userRoutes = require('./router/user.router');
const categoryRouter = require('./router/category.router');
const transactionRouter = require('./router/transaction.router');
const accountRouter = require('./router/account.router');
const errorHandler = require('./middleware/error.middleware');
const { auth } = require('./middleware/auth.middleware');
const requestLogger = require('./middleware/request.logger.middleware');
const cors = require('cors');

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET'],
    allowedHeaders: ['Authorization']
};

app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(requestLogger);

app.use('/', loginRoutes);
app.use('/users', auth, userRoutes);
app.use('/categories', auth, categoryRouter);
app.use('/transactions', auth, transactionRouter);
app.use('/accounts', auth, accountRouter);


app.use(errorHandler);

module.exports = app;