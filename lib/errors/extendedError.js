
class ExtendedError {

    constructor(message, data, statusCode) {
        this.message = message;
        this.data = data;
        this.statusCode = statusCode || 500;
    }

}

module.exports = ExtendedError;



