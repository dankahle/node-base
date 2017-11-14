const BasicError = require('../errors/basicError');

module.exports = function (req, res, next) {
    next(new BasicError('Endpoint not found.', '000-0105', 404));
}
