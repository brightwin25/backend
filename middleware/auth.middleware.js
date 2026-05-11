const { request } = require("express");
const jwt = require('jsonwebtoken');
const { throwError } = require("../utils/response-handler");
const tokenValidity = require("../constants/common.constants");
const asyncLocalStorage = require("../utils/async-context");
const logger = require("./logger.middleware");


const auth = (req, res, next) => {
    try {
        logger.info('Entering into authentication middleware !');
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (!token) {
            throwError(403, 'Missing Token')
        }

        logger.info('Got token from the header', { token });

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const verified = jwt.verify(token, jwtSecretKey);

        if (!verified) {
            throwError(403, 'Invalid Token')
        }

        const store = asyncLocalStorage.getStore();
        store.userName = verified.userName;
        store.userId = verified.userId;

        const currentDate = new Date();
        const loginTime = new Date(verified.time);
        const loginDuration = currentDate - loginTime;

        if (loginDuration / 60000 > tokenValidity) {
            throwError(403, 'Token experied')
        }

        logger.info('Token validated. Exiting from authentication middleware !');
        next();
    } catch (error) {
        throw error;
    }
}

module.exports = { auth }