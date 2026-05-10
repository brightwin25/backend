const logger = require("../middleware/logger.middleware");

const sendSuccessResponse = (res, { code = 200, responseId, data = null, message }) => {
    logger.info(message, data);
    return res.status(code).json({
        code,
        responseId,
        data,
        message,
    })
}

const throwError = (statusCode = 500, message) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    throw err;
};


module.exports = { sendSuccessResponse, throwError } 