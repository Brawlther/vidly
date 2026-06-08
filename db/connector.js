import mongoose from "mongoose";
import winston from "winston";
import config from 'config';

const dbPath = config.get('db')
const connection = mongoose.connect(dbPath)
  .then(() => {
    if (process.env.NODE_ENV !== 'test') {
      winston.info(`Connected to ${dbPath}.`);
    }
  })
  .catch(err => {
    if (process.env.NODE_ENV !== 'test') {
      winston.error(`Could not connect to ${dbPath}.`, err);
    } else {
      throw err;
    }
  });

export default connection;