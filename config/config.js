const config = require('./environments.json');
const logger = require('./winston');
// Config variables
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
// Config variables
// log global.gConfig
logger.info(`Environment: ${environmentConfig.config_id}`);

module.exports = environmentConfig;
