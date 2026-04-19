const winston = require('winston');

// const logFormat = winston.format.combine(
//     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     winston.format.json(),
// );

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
})

module.exports = logger;