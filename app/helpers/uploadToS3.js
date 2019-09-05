const appRoot = require('app-root-path');
const ffmpeg = require('fluent-ffmpeg');
const S3batch = require('s3-batch-upload').default;
const rimraf = require('rimraf');
// configs and utils
const logger = require(`${appRoot}/config/winston`);
const appConstants = require(`${appRoot}/constants/appConstants`);

const uploadToS3 = (file, screenshotName, callback) => {
  const response = {
    screenshots: [],
  };
  let files = [];
  ffmpeg(file.path)
    .on('end', async () => {
      files = await new S3batch({
        config: './config/configS3.json',
        bucket: 'talview-screenshots',
        localPath: `${appRoot}/output`,
        remotePath: 'screenshots',
        concurrency: '200',
      }).upload();

      logger.debug(files);

      files.forEach((f) => {
        response.screenshots.push(`${appConstants.BUCKET_URL}${f}`);
      });
      response.filename = file.originalname;
      rimraf(`${appRoot}/output/*`, () => logger.info('deleted files of output folder'));
      rimraf(`${appRoot}/uploads/*`, () => logger.info('deleted files of uploads folder'));
      callback(null, response);
    })
    .screenshots({
      count: 4,
      filename: `${screenshotName}_%i.png`,
      folder: './output',
    });
};

module.exports = uploadToS3;
