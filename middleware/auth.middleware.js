const { request } = require("express");
const jwt = require('jsonwebtoken');
const { throwError } = require("../utils/response-handler");


const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            throwError(403, 'Missing Token')
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const verified = jwt.verify(token, jwtSecretKey);

        if (!verified) {
            throwError(403, 'Invalid Token')
        }
        req.userName = verified.userName;
        req.userId = verified.userId;

        const currentDate = new Date();
        const loginTime = new Date(verified.time);
        const loginDuration = currentDate - loginTime;

        if (loginDuration / 60000 > 90) {
            throwError(403, 'Token experied')
        }

        next();
    } catch (error) {
        throw error;
    }
}

module.exports = { auth }