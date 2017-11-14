/**
 * ExtendedError
 * @desc - a json stringifyable class with statusCode derfault that includes a data payload for additional information
 */
class ExtendedError {

  constructor(message, data, errorCode, statusCode) {
    this.message = message;
    this.data = data;
    if (errorCode) {
      this.errorCode = errorCode;
    }
    this.statusCode = statusCode || 500;
  }

}

module.exports = ExtendedError;



