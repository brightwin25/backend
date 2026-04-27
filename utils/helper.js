const sendSuccessResponse = (res, { code = 200, responseId, data = null, message }) => {
    res.status(code).json({
        responseId,
        data,
        message,
    })
}

module.exports = { sendSuccessResponse } 