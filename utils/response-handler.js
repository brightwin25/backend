const sendSuccessResponse = (res, { code = 200, responseId, data = null, message }) => {
    res.status(code).json({
        responseId,
        data,
        message,
    })
}

const sendFailureResponse = (res, { code = 500, responseId, data = null, message }) => {
    res.status(code).json({
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


module.exports = { sendSuccessResponse, sendFailureResponse, throwError } 