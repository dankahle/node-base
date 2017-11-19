module.exports = {
  Config: require('./lib/config'),
  Validate: require('./lib/validate'),
  errors: {
    errorCodes: require('./lib/errors/errorCodes'),
    BasicError: require('./lib/errors/basicError'),
    ExtendedError: require('./lib/errors/extendedError')
  },
  middleware: {
    authenticate: require('./lib/middleware/authenticate'),
    loginRouter: require('./lib/middleware/loginRouter'),
    registerRouter: require('./lib/middleware/registerRouter'),
    errorHandler: require('./lib/middleware/errorHandler'),
    notFound: require('./lib/middleware/notFound')
  }
}

