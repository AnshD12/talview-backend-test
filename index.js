const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config.js');
const logger = require('./config/winston');
const routes = require('./app/routes');

const db = config.mongoDb.uri;
logger.debug(db);
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect(db, { useNewUrlParser: true })
  .then(() => logger.info('database connected'))
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });

routes(app);

const port = config.port || 3002;

app.listen(port, () => logger.info(`server running on port ${port}`));

module.exports = app;
