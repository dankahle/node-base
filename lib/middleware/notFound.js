const ExtendedError = require('../errors/extendedError'),
  errorCodes = require('../errors/errorCodes'),
  _ = require('lodash');

module.exports = function(options) {

  const _config = new (require('../config'))().getConfig();
  const config = _.merge(_config.middleware.notFound, options);

  return function (req, res, next) {
    next(new ExtendedError('Endpoint not found.', {method: req.method, url: req.url},  errorCodes.server_prefix + errorCodes.server_endpoint_not_found, 404));
  }
}

