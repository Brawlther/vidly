import express from 'express';
import connection from './db/connector.js';
import {useRoutes} from './routes/routes.js';
import winstonMongoDB from 'winston-mongodb';
import initLogging from './utils/startup/logging.js';
import validateConfig from './utils/startup/config.js';
import winston from 'winston';
import {prod} from './startup/prod.js'

if (process.env.NODE_ENV !== 'test') {
    initLogging();
}

const app = express()
useRoutes(app);

prod(app)

validateConfig();

const PORT = process.env.PORT || 5050;
let server;

if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => {
        winston.info(`Server is running on port ${PORT}...`);
    });
}

export { app, server };