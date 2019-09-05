/* eslint-disable no-param-reassign */
const appRoot = require('app-root-path');
// configs and utils
const logger = require(`${appRoot}/config/winston`);
// constants
const appConstants = require(`${appRoot}/constants/appConstants`);
// helpers
const uploadToS3 = require(`${appRoot}/app/helpers/uploadToS3`);

exports.createScreenshots = async (req, res) => {
  if (req.body && req.file) {
    logger.debug(JSON.stringify(req.file));
    const screenshotName = req.file.originalname.split('.')[0];
    uploadToS3(req.file, screenshotName, (err, response) => {
      if (err) {
        logger.error(err);
      }
      logger.debug(response);
      res.status(200).send(response);
    });
  } else {
    res.status(400).send({
      message: appConstants.ERROR_MESSAGES.ALL_FIELDS_REQUIRED,
      error: appConstants.ERROR_MESSAGES.VALIDATION_ERROR,
    });
  }
};
