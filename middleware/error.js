const errorHandler = (err, req, res, next) => {
  const uniqueId = req.uniqueId;
  const timeTaken = Date.now() - req.start;
  
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;