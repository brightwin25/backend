const { request } = require("express");
const { sendFailureResponse } = require("../utils/response-handler");
const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            return sendFailureResponse(res, {
                code: 403,
                message: 'Missing token',
                responseId: 2,
            })
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const verified = jwt.verify(token, jwtSecretKey);

        if (!verified) {
            return sendFailureResponse(res, {
                code: 403,
                message: 'Invalid token',
                responseId: 2,
            })
        }
        req.userName = verified.userName;
        req.userId = verified.userId;

        const currentDate = new Date();
        const loginTime = new Date(verified.time);
        const loginDuration = currentDate - loginTime;

        if (loginDuration / 60000 > 90) {
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