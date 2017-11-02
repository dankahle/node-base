
class BasicError {

    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode || 500;
    }

}

module.exports = BasicError;



