const multer = require('multer');
const appRoot = require('app-root-path');
// modules
const { createScreenshots } = require(`${appRoot}/app/modules/createScreenshots`);
// constants
const appConstants = require(`${appRoot}/constants/AppConstants`);

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    const filenameArr = file.originalname.split('.');
    callback(null, `${filenameArr[0].replace(/\s/g, '')}-${Date.now()}.${filenameArr[1]}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const videoTypes = ['video/mp4'];
    if (!videoTypes.includes(file.mimetype)) {
      return callback(new Error(appConstants.ERROR_MESSAGES.INVALID_FILE));
    }
    return callback(null, true);
  },
});
const type = upload.single('video');

module.exports = (app) => {
  app.post('/createScreenshots', type, createScreenshots);
};
