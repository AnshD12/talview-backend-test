const responseManager = require('./responseHandler');
const headerConstants = require('../constants/headerConstants');


const throwError = (message, err, res, header) => {
  let extra = {};
  message = message || err.message;
  extra = {
    header_status: header || headerConstants.FAIL.SERVER_ERROR,
    message,
  };
  extra.res = res;
  responseManager(err, null, extra);
};


module.exports = throwError;
