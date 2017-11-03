
module.exports = {
    Validate: require('./lib/validate'),
    errors: {
      BasicError: require('./lib/errors/basicError'),
      ExtendedError: require('./lib/errors/extendedError')
    },
    middleware: {
        errorHandler: require('./lib/middleware/errorHandler'),
        notFound: require('./lib/middleware/notFound')
    }
}
