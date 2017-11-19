const ExtendedError = require('../errors/extendedError'),
  errorCodes = require('../errors/errorCodes'),
  _ = require('lodash');

module.exports = function(options) {

  let config = new (require('../config'))().getConfig();
  config = _.merge(config, options);

  return function (req, res, next) {
    next(new ExtendedError('Endpoint not found.', {url: req.url},  errorCodes.server_prefix + errorCodes.server_endpoint_not_found, 404));
  }
}

