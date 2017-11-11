/**
 * ExtendedError
 * @desc - a json stringifyable class with statusCode derfault that includes a data payload for additional information
 */
class ExtendedError {

    constructor(message, data, statusCode) {
        this.message = message;
        this.data = data;
        this.statusCode = statusCode || 500;
    }

}

module.exports = ExtendedError;



