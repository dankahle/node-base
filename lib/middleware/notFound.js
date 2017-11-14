const BasicError = require('../errors/basicError');

module.exports = function (req, res, next) {
    next(new BasicError('Endpoint not found.', null, 404));
}
