const logger = require('./logger');
const userService = require('../service/user-service');
const asyncLocalStorage = require('../utils/async-context');

const requestLogger = async (req, res, next) => {
    const start = Date.now();
    const requestId = Math.random().toString(36).substring(2, 12);
    let userName = 'Anonymous';
    try {
        const userId = req.query?.userId;

        if (userId) {
            const user = await userService.getuserById(userId);
            userName = user?.name || 'Anonymous';
        }
    } catch (error) {
        logger.error('Error in fetching user', {
            error: error.message
        });
    };

    asyncLocalStorage.run({ requestId, userName, start }, async () => {
        logger.info('API entry', {
            method: req.method,
            url: req.originalUrl,
            body: req?.body,
            userName: userName,
        })
        res.on('finish', () => {
            if (res.statusCode < 400) {
                const timeTaken = Date.now() - start;
                logger.info("Exiting API", {
                    method: req.method,
                    url: req.originalUrl,
                    body: req?.body,
                    userName: userName,
                    TimeTaken: timeTaken
                });
            }
        });
        next();
    });

}

module.exports = requestLogger;