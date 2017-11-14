const request = require('supertest'),
  expect = require('chai').expect,
  express = require('express'),
  lib = require('..'),
  config = new lib.Config(),
  notFound = lib.middleware.notFound,
  errorHandler = lib.middleware.errorHandler,
  BasicError = lib.errors.BasicError,
  ExtendedError = lib.errors.ExtendedError;

const message = 'message',
  errorCode = '111-2222',
  statusCode = 444,
  stack = 'stack',
  data = {name: 'dank', age: 50};

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'dank' });
});

app.get('/basic-error', function(req, res, next) {
  const err = new BasicError(message, errorCode, statusCode);
  err.stack = stack;
  next(err);
});

app.get('/extended-error', function(req, res, next) {
  const err = new ExtendedError(message, data, errorCode, statusCode);
  err.stack = stack;
  next(err);
});

app.get('/server-error', function(req, res, next) {
  throw new Error('something bad');
});

app.use(notFound);
app.use(errorHandler);


describe('middleware', function() {

  describe('notFound', function() {

    it('should return normal endpoint', function(done) {
      request(app)
        .get('/user')
        .expect(200, {name: 'dank'}, done);
    })

    it('should return 404 not found for missing endpoint', function(done) {
      request(app)
        .get('/missing')
        .expect(404, { message: 'Endpoint not found.' }, done);
    })

  })

  describe('errorHandler', function() {

    it('should return correct json for BasicError', function(done) {
      request(app)
        .get('/basic-error')
        .expect(statusCode, {
          "errorCode": "111-2222",
          "message": "message",
          "stack": "stack"
        }, done)
    })

    it('should return correct json for ExtendedError', function(done) {
      request(app)
        .get('/extended-error')
        .expect(statusCode, {
          "data": {
            "age": 50,
            "name": "dank"
          },
          "errorCode": "111-2222",
          "message": "message",
          "stack": "stack"
        }, done)
    })

    it('should return correct json for server error', function(done) {
      request(app)
        .get('/server-error')
        .expect(500)
        .expect(function(res) {
          expect(res.body.message).to.equal('something bad');
          expect(res.body.stack).to.not.exist;

        })
        .end(done)
    })

    it('should return stack when showStackWithErrors=true', function(done) {
      config.setConfig({showStackWithErrors: true});

      request(app)
        .get('/server-error')
        .expect(500)
        .expect(function(res) {
          expect(res.body.message).to.equal('something bad');
          expect(res.body.stack).to.exist;

        })
        .end(done)
    })

  })

})




