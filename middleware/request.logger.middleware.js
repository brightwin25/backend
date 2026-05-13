const logger = require('./logger.middleware');
const asyncLocalStorage = require('../utils/async-context');

const requestLogger = async (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (ip && ip.includes(',')) {
        ip = ip.split(',')[0].trim();
    }

    const start = Date.now();
    const requestId = Math.random().toString(36).substring(2, 12);
    let userName = 'Anonymous';

    function getUserName() {
        const store = asyncLocalStorage.getStore();
        return store?.userName ? store.userName : 'Anonymous';
    }

    asyncLocalStorage.run({ requestId, userName, start, ip }, async () => {
        logger.info('API entry', {
            method: req.method,
            url: req.originalUrl,
            body: req?.body,
            userName: userName,
            ip,
        })
        res.on('finish', () => {
            if (res.statusCode < 400) {
                const timeTaken = Date.now() - start;
                logger.info("Exiting API", {
                    method: req.method,
                    url: req.originalUrl,
                    body: req?.body,
                    userName: getUserName(),
                    ip,
                    TimeTaken: timeTaken + 'ms'
                });
            }
        });
        next();
    });

}

module.exports = requestLogger;