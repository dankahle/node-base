const expect = require('chai').expect,
  lib = require('../'),
  BasicError = lib.errors.BasicError,
  ExtendedError = lib.errors.ExtendedError;


describe('errors', function() {
  const message = 'message',
    statusCode = 444;


  describe('BasicError', function() {

    it('should set all properties', function() {
      const err = new BasicError(message, statusCode);
      expect(err.message).to.equal(message);
      expect(err.statusCode).to.equal(statusCode);
    })

    it('should default statusCode to 500', function() {
      const err = new BasicError(message);
      expect(err.message).to.equal(message);
      expect(err.statusCode).to.equal(500);
    })

    it('should supply correct json', function() {
      const err = new BasicError(message, statusCode);
      expect(err).to.eql({
        "message": "message",
        "statusCode": 444
      });
    })

  })

  describe('ExtendedError', function() {
    const data = {
      name: 'dank',
      age: 50
    };

    it('should set all properties', function() {
      const err = new ExtendedError(message, data, statusCode);
      expect(err.message).to.equal(message);
      expect(err.data).to.equal(data);
      expect(err.statusCode).to.equal(statusCode);
    })

    it('should default statusCode to 500', function() {
      const err = new ExtendedError(message, data);
      expect(err.message).to.equal(message);
      expect(err.data).to.equal(data);
      expect(err.statusCode).to.equal(500);
    })

    it('should supply correct json', function() {
      const err = new ExtendedError(message, data, statusCode);
      expect(err).to.eql({
        "message": "message",
        "data": {
          "age": 50,
          "name": "dank"
        },
        "statusCode": 444
      });
    })

  })


})






