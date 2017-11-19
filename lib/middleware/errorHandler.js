const _ = require('lodash');

/**
 * errorHandler
 * @desc - error handling middleware. We need the error json to show the message and stack properties
 * but these are hidden in json by default, so we add them to another object for json.stringify()
 * @param err
 * @param req
 * @param res
 * @param next
 */

module.exports = function(options) {

  let config = new (require('../config'))().getConfig();
  config = _.merge(config, options);

  return function (err, req, res, next) {
    const obj = Object.assign({}, err);
    if (err && err.message) {
      obj.message = err.message;
    }
    if (!err.statusCode) {
      obj.statusCode = errorCodes.server_prefix + errorCodes.server_unknown_error;
    }
    if (err && err.stack && config.middleware.errorHandler.showStackWithErrors) {
      obj.stack = err.stack;
    }
    delete obj.statusCode;
    console.error(obj);
    res.status(err.statusCode || 500).send(obj);
  };

}


