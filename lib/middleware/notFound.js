const ExtendedError = require('../errors/extendedError'),
  errorCodes = require('../errors/errorCodes')

module.exports = function (req, res, next) {
    next(new ExtendedError('Endpoint not found.', {url: req.url},  errorCodes.server_prefix + errorCodes.server_endpoint_not_found, 404));
}
