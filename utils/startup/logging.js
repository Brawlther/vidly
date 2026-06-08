import winston from 'winston';

function initLogging() {
    winston.exitOnError = true;

    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'winston/logs/uncaughtExceptions.log' })
    );

    winston.rejections.handle(
        new winston.transports.File({ filename: 'winston/logs/unhandledRejections.log' })
    );

    winston.add(new winston.transports.File({ filename: 'winston/logs/logfile.log' }));
    
    winston.add(new winston.transports.MongoDB({
        db: 'mongodb://localhost/mongo-exercises',
        level: 'error',
    }));
}

export default initLogging;