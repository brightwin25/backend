const { sendFailureResponse } = require("../utils/response-handler");
const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const verified = jwt.verify(token, jwtSecretKey);

        if (!verified) {
            return sendFailureResponse(res, {
                code: 403,
                message: 'Invalid token',
                responseId: 2,
            })
        }

        const currentDate = new Date();
        const loginTime = new Date(verified.time);
        const loginDuration = currentDate - loginTime;

        if (loginDuration / 60000 > 60) {
            return sendFailureResponse(res, {
                code: 403,
                message: 'Token experied',
                responseId: 2,
            })
        }

        next();
    } catch (error) {
        throw error;
    }
}

module.exports = { auth }