const headerConstants = require('../constants/headerConstants');
const config = require('../config/config');

const responseHandler = (err, response, extra) => {
  let result = { response };
  let { headerStatus } = extra;
  const { message, req, res } = extra;
  if (message !== '') {
    result = { ...result, message };
  }
  if (req !== undefined && req.body !== undefined && req.body.with_request) {
    result = { ...result, request: req };
  }

  if (!err && !(headerStatus >= 400)) {
    res.status(headerConstants.SUCCESS).send(result);
  } else {
    let errorResponse = {};

    if (config.debug) {
      errorResponse = { err: err != null ? (err.stack !== undefined ? err.stack.split('\n') : err) || err : 'Solvable Error' };
    }
    if (message !== '') {
      errorResponse = { ...errorResponse, message };
    } else {
      errorResponse.message = 'Something went wrong';
    }
    if (!headerStatus) {
      headerStatus = headerConstants.FAIL.SERVER_ERROR;
    }
    res.status(headerStatus).send(errorResponse);
  }
};

module.exports = responseHandler;
