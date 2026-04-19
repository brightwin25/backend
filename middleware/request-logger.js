const logger = require('./logger');
const userService = require('../service/user-service');
const crypto = require('crypto');

const requestLogger = async (req, res, next) => {
    const start = Date.now();
    const customReqString = Math.random().toString(36).substring(2, 12);
    req.uniqueId = customReqString;

    let userName = '';
    try {
        const userId = req.query.userId ? req.query.userId : 0;
        userId !== 0 ? userName = (await userService.getuserById(userId))?.name : 'Anonymous';
    } catch (error) {
        logger.error('Error in fetching user');
        next(error);
    }
    logger.info(`Entering into ${req.method} ${req.originalUrl} ${req.body ? req.body : ''} Request hit by ${userName} - *${customReqString}*`);

    res.on('finish', () => {
        const timeTaken = Date.now() - start;
        logger.info(`Exiting the API ${req.method} ${req.originalUrl} ${req.body ? req.body : ''} Request hit by ${userName} - *${req.uniqueId}* Response code - ${res.statusCode} timeTaken - ${timeTaken}ms`)
    });
    next();
}

module.exports = requestLogger; 