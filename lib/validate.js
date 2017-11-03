const tv4 = require('tv4'),
    formats = require('tv4-formats'),
    validator = tv4.freshApi(),
    ExtendedError = require('./errors/extendedError');

validator.addFormat(formats);


class Validate {

    static validate(val, schema) {
        const results = validator.validateMultiple(val, schema);
        if (!results.valid) {
            return new ExtendedError('Validation errors', Validate.extractErrors(results.errors), 400);
        }
    }

    static extractErrors(errors) {
        return errors.map(e => ({path: e.dataPath, message: e.message}));
    }
}


module.exports = Validate;

