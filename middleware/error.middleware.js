const asyncLocalStorage = require('../utils/async-context');
const logger = require('./logger.middleware');
const response = require('../utils/response-handler');

const errorHandler = (err, req, res, next) => {

  const store = asyncLocalStorage.getStore();
  const requestId = store?.requestId;
  const userName = store?.userName || 'Anonymous';
  const startTime = store?.start || Date.now();

  const timeTaken = Date.now() - startTime;

  logger.error('Exiting API with error', {
    message: err.message,
    status: err.statusCode || 500,
    method: req.method,
    url: req.originalUrl,
    body: req?.body,
    userName,
    requestId,
    TimeTaken: timeTaken + 'ms',
  })

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    statusCode,
    responseId: 2,
    message: err.message,
  })
};

module.exports = errorHandler;