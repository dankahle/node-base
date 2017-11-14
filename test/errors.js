const expect = require('chai').expect,
  lib = require('../'),
  BasicError = lib.errors.BasicError,
  ExtendedError = lib.errors.ExtendedError;


describe('errors', function() {
  const message = 'message',
    errorCode = '111-2222';
    statusCode = 444;


  describe('BasicError', function() {

    it('should set all properties', function() {
      const err = new BasicError(message, errorCode, statusCode);
      expect(err.message).to.equal(message);
      expect(err.errorCode).to.equal(errorCode);
      expect(err.statusCode).to.equal(statusCode);
    })

    it('should default statusCode to 500', function() {
      const err = new BasicError(message);
      expect(err.message).to.equal(message);
      expect(err.errorCode).to.be.undefined;
      expect(err.statusCode).to.equal(500);
    })

    it('should supply correct json', function() {
      const err = new BasicError(message, errorCode, statusCode);
      expect(JSON.parse(JSON.stringify(err))).to.eql({
        message: message,
        errorCode: errorCode,
        statusCode: statusCode
      });
    })

  })

  describe('ExtendedError', function() {
    const data = {
      name: 'dank',
      age: 50
    };

    it('should set all properties', function() {
      const err = new ExtendedError(message, data, errorCode, statusCode);
      expect(err.message).to.equal(message);
      expect(err.data).to.equal(data);
      expect(err.errorCode).to.equal(errorCode);
      expect(err.statusCode).to.equal(statusCode);
    })

    it('should default statusCode to 500 with errorCode', function() {
      const err = new ExtendedError(message, data, errorCode);
      expect(err.message).to.equal(message);
      expect(err.data).to.equal(data);
      expect(err.errorCode).to.equal(errorCode);
      expect(err.statusCode).to.equal(500);
    })

    it('should default statusCode to 500 wihtout errorCode', function() {
      const err = new ExtendedError(message, data);
      expect(err.message).to.equal(message);
      expect(err.data).to.equal(data);
      expect(err.errorCode).to.be.undefined;
      expect(err.statusCode).to.equal(500);
    })

    it('should supply correct json', function() {
      const err = new ExtendedError(message, data, errorCode, statusCode);
      expect(JSON.parse(JSON.stringify(err))).to.eql({
        message: message,
        data: data,
        errorCode: errorCode,
        statusCode: statusCode
      });
    })

  })


})






