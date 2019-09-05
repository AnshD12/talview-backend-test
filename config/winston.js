const {
  createLogger,
  addColors,
  format,
  transports,
} = require('winston');
const path = require('path');
const fs = require('fs');

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
  },
};

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

addColors(config.colors);

const filename = path.join(logDir, 'results.log');

const logger = createLogger({
  levels: config.levels,
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
        ),
      ),
      level: env === 'testing' ? 'error' : 'debug',
    }),

    new transports.File({
      filename,
      level: 'error',
      format: format.combine(
        format.printf(
          info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`,
        ),
      ),
    }),
  ],
});

module.exports = logger;
