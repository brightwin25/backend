const winston = require('winston');
const asyncLocalStorage = require('../utils/async-context');
//One month rotation of logger
const addRequestId = winston.format((info) => {
    const store = asyncLocalStorage.getStore();

    if (store) {
        info.requestId = store.requestId;
        info.ip = store.ip;
    }
    return info;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        addRequestId(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

module.exports = logger;