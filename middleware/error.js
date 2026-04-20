const asyncLocalStorage = require('../utils/async-context');
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {

  const store = asyncLocalStorage.getStore();
  // if (store) {
  const requestId = store?.requestId;
  const userName = store?.userName || 'Anonymous';;
  const startTime = store?.start || Date.now();;
  // }

  const timeTaken = Date.now() - startTime;

  logger.error('Exiting API with error', {
    error: err.message,
    status: err.statusCode || 500,
    method: req.method,
    url: req.originalUrl,
    body: req?.body,
    userName,
    requestId,
    TimeTaken: timeTaken,
  })

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    requestId,
    message: err.message || "Internal server error",
    status: statusCode,
  });
};

module.exports = errorHandler;