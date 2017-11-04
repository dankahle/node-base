const tv4 = require('tv4'),
    formats = require('tv4-formats'),
    validator = tv4.freshApi(),
    ExtendedError = require('./errors/extendedError');

validator.addFormat(formats);


class Validate {

    static validateObject(val, schema) {
        const results = validator.validateMultiple(val, schema);
        if (!results.valid) {
            return new ExtendedError('Validation errors', Validate.extractErrors(results.errors), 400);
        }
    }

    static validateGuid(guid) {
      // returns boolean, error will be in validator.error (not tv4.error)
      return validator.validate(guid, {type: 'string', format: 'guid'});
    }
}

module.exports = Validate;

function extractErrors(errors) {
  return errors.map(e => ({path: e.dataPath, message: e.message}));
}


