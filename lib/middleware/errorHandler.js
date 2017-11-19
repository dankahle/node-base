const Config = new require('../config'),
  config = new Config();

/**
 * errorHandler
 * @desc - error handling middleware. We need the error json to show the message and stack properties
 * but these are hidden in json by default, so we add them to another object for json.stringify()
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = function (err, req, res, next) {
  const _config = config.getConfig();
  const obj = Object.assign({}, err);
  if (err && err.message) {
    obj.message = err.message;
  }
  if (!err.statusCode) {
    obj.statusCode = errorCodes.server_prefix + errorCodes.server_unknown_error;
  }
  if (err && err.stack && _config.showStackWithErrors) {
    obj.stack = err.stack;
  }
  delete obj.statusCode;
  console.error(obj);
  res.status(err.statusCode || 500).send(obj);
};


