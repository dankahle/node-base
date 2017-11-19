const express = require('express'),
  Validate = require('../validate'),
  chance = new require('chance')(),
  errorCodes = require('../errors/errorCodes'),
  BasicError = require('../errors/basicError');

router = express.Router();
module.exports = router;

const userSchema = {
  "title": "user",
  "type": "object",
  "required": ["name"],
  "properties": {
    "_id": {
      "type": "string",
      "format": "guid"
    },
    "name": {
      "type": "string"
    }
  }
}

router.post('/', function (req, res, next) {
  const error = Validate.validateObject(req.body, userSchema);
  if (error) {
    next(error);
  } else {
    const user = req.body;
    user._id = user._id || chance.guid();
    user.labels = user.labels || [];
    db = req.db.collection('users');
    db.findOne({name: user.name})
      .then(_user => {
        if (_user) {
          next(new BasicError('User already exists', errorCodes.server_prefix + errorCodes.user_already_exists, 400));
          return;
        }
        db.insertOne(user)
          .then(resp => {
            if(resp.insertedCount === 1) {
              res.cookie('dkAuth', user);
              res.send(user);
            } else {
              next(new BasicError('User not registered', errorCodes.server_prefix + errorCodes.user_not_registered))
            }
          })
          .catch(next)
      })
      .catch(next);
  }})
