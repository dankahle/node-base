const tv4 = require('tv4'),
  formats = require('tv4-formats'),
  validator = tv4.freshApi(),
  ExtendedError = require('./errors/extendedError');

validator.addFormat(formats);

/**
 * Validate
 * @desc - a validation class for all types of validation. Utilizes json schema tv4 validation
 */
class Validate {

  /**
   * validateObject
   * @desc - validates an object using given json schema. If valid, returns undefined. If invalid, returns an ExtendedError with
   * message: "Validation errors" and data an array of the tv4 validateMultiple() messages: {dataPath, message}
   * @param val - value you want to validate
   * @param schema - json schema to validate against
   * @returns {undefined | ExtendedError}
   */
  static validateObject(val, schema) {
    const results = validator.validateMultiple(val, schema);
    if (!results.valid) {
      return new ExtendedError('Validation errors', extractErrors(results.errors), 400);
    }
  }

  /**
   * validateGuid - validates a given guie
   * @param guid
   * @returns {*}
   */
  static validateGuid(guid) {
    // returns boolean, error will be in validator.error (not tv4.error)
    return validator.validate(guid, {type: 'string', format: 'guid'});
  }
}

module.exports = Validate;

function extractErrors(errors) {
  return errors.map(e => ({path: e.dataPath, message: e.message}));
}


