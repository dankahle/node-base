/*
var MongoClient = require('mongodb').MongoClient,
  expect = require('chai').expect,
  _ = require('lodash');

  describe.only('mongodb', function () {
  let db = null,
    coll = null;

  before(function (done) {
    MongoClient.connect('mongodb://localhost:27017/nodebase', function (err, _db) {
      db = _db;
      coll = db.collection('coll');
      done();
    });
  });

  after(function (done) {
    db.close();
    done();

  })

  beforeEach(done => {
    coll.deleteMany({})
      .then(() => done());
  })

  it.skip('should insert and find', function (done) {

    coll.insertMany([{a: 1}, {a: 2}, {a: 3}])
      .then(() => {
        return coll.find().toArray()
          .then(docs => {
            expect(docs.length).to.equal(3);
            done();
          })
          .catch(done);
      })
      .catch(done);

  })


})
*/
