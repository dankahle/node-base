const errorCodes = require('../errors/errorCodes'),
  BasicError = require('../errors/basicError');

module.exports = function (req, res, next) {
  if (req.cookies.dkAuth) {
    req.user = req.cookies.dkAuth;
    next();
  } else {
    if (process.env.NODE_ENV === 'unit' && req.url !== '/cause-401-endpoint') {
      next();
    } else {
      next(new BasicError('Not authenticated', errorCodes.server_prefix + errorCodes.user_not_authenticated, 401));
    }
  }
}


