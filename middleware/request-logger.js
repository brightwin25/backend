const logger = require('./logger');
const userService = require('../service/user-service');
const asyncLocalStorage = require('../utils/async-context');

const requestLogger = async (req, res, next) => {
    const start = Date.now();
    const requestId = Math.random().toString(36).substring(2, 12);
    // req.uniqueId = customReqString;
    // req.start = start;

    asyncLocalStorage.run({ requestId }, async () => {
        let userName = 'Anonymous';
        const userId = req.query?.userId;
        if (userId) {
            userService.getuserById(userId)
                .then(user => {
                    userName = user?.name || 'Anonymous';
                }).catch(() => {
                    logger.error('Error fetching user');
                });
        }

        // logger.info(`Entering ${req.method} ${req.originalUrl} ${req.body ? req.body : ''} - Request hit by ${userName}`);
        logger.info('API entry', {
            method: req.method,
            url: req.originalUrl,
            body: req?.body,
            userName: userName,
        })
        res.on('finish', () => {
            const timeTaken = Date.now() - start;
            // logger.info(`Exiting ${req.method} ${req.originalUrl} ${req.body ? req.body : ''} - Request hit by ${userName} - Status - ${res.statusCode} TimeTaken - ${timeTaken}ms`)
            logger.info("Exiting API", {
                method: req.method,
                url: req.originalUrl,
                body: req?.body,
                userName: userName,
                TimeTaken: timeTaken
            })
        });
        next();
    });

}

module.exports = { requestLogger, asyncLocalStorage }; 