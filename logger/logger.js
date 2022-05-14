import {createLogger, format, transports} from 'winston';

const logConfiguration = {
    transports:
    new transports.File({
    filename: 'logger/logs/server.log',
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),
};

export const logger = createLogger(logConfiguration);