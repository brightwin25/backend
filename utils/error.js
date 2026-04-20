const throwError = (statusCode = 500, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

module.exports = throwError;