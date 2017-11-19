const request = require('supertest'),
  expect = require('chai').expect,
  express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  lib = require('..'),
  config = new lib.Config(),
  notFound = lib.middleware.notFound,
  errorHandler = lib.middleware.errorHandler,
  authenticate = lib.middleware.authenticate,
  BasicError = lib.errors.BasicError,
  ExtendedError = lib.errors.ExtendedError,
  errorCodes = lib.errors.errorCodes,
  loginRouter = lib.middleware.loginRouter,
  registerRouter = lib.middleware.registerRouter,
  Validate = lib.Validate,
  _ = require('lodash');


const message = 'message',
  badMessage = 'something bad',
  errorCode = '111-2222',
  statusCode = 444,
  stack = 'stack',
  data = {name: 'dank', age: 50};

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req, res, next) {
  req.db = {
    collection: function(val) {
      return this;
    },
    findOne: function() {
      return new Promise(function(resolve, reject) {
        resolve({_id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'});
      })
    },
    insertOne: function() {
      return new Promise(function(resolve, reject) {
        resolve({insertedCount: 1});
      })
    }
  };
  next();
})

app.get('/user', function (req, res) {
  res.status(200).json({name: 'dank'});
});

app.get('/basic-error', function (req, res, next) {
  const err = new BasicError(message, errorCode, statusCode);
  err.stack = stack;
  next(err);
});

app.get('/extended-error', function (req, res, next) {
  const err = new ExtendedError(message, data, errorCode, statusCode);
  err.stack = stack;
  next(err);
});

app.get('/server-error', function (req, res, next) {
  throw new Error(badMessage);
});

app.use(notFound());
app.use(errorHandler());


describe('middleware', function () {

  describe('notFound', function () {

    it('should return normal endpoint', function (done) {
      request(app)
        .get('/user')
        .expect(200, {name: 'dank'}, done);
    })

    it('should return 404 not found for missing endpoint', function (done) {
      request(app)
        .get('/bad-endpoint')
        .expect(404)
        .expect(function(res) {
          expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.server_endpoint_not_found);
          expect(res.body.message).to.equal('Endpoint not found.')
        })
        .end(done);
    })

  })

  describe('errorHandler', function () {

    it('should return correct json for BasicError', function (done) {
      request(app)
        .get('/basic-error')
        .expect(statusCode, {
          errorCode: errorCode,
          message: "message",
          stack: "stack"
        }, done)
    })

    it('should return correct json for ExtendedError', function (done) {
      request(app)
        .get('/extended-error')
        .expect(statusCode, {
          "data": {
            "age": 50,
            "name": "dank"
          },
          "errorCode": errorCode,
          "message": "message",
          "stack": "stack"
        }, done)
    })

    it('should return correct json for server error', function (done) {
      request(app)
        .get('/server-error')
        .expect(500, {message: badMessage}, done);
    })

    it('should return stack when showStackWithErrors=true', function (done) {
      config.setConfig(_.set({}, 'middleware.errorHandler.showStackWithErrors', true));

      request(app)
        .get('/server-error')
        .expect(500)
        .expect(function (res) {
          expect(res.body.message).to.equal(badMessage);
          expect(res.body.stack).to.exist;
        })
        .end(done)
    })

  })

})




