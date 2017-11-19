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

// send user back if cookie and user exists, or send null
router.get('/current', function(req, res, next) {
  if (req.cookies.dkAuth) {
    const user = req.cookies.dkAuth;
    db = req.db.collection('users');
    db.findOne({id: user.id})
      .then(_user => {
        if (_user) {
          res.send(_user);
        } else {
          next(new BasicError('User not found', errorCodes.server_prefix + errorCodes.resource_not_found, 404));
        }
      })
      .catch(next);
  } else {
    // next(new BasicError('User not found', errorCodes.server_prefix + errorCodes.user_cookie_not_found, 404));
    res.status(404).end();
  }
})

router.post('/', function (req, res, next) {
  const error = Validate.validateObject(req.body, userSchema);
  if (error) {
    next(error);
  } else {
    const user = req.body;
    user._id = user._id || chance.guid();
    db = req.db.collection('users');
    db.findOne({name: user.name})
      .then(_user => {
        if (!_user) {
          next(new BasicError('User not found', errorCodes.server_prefix + errorCodes.user_not_found, 404))
          return;
        }
        res.cookie('dkAuth', _user);
        res.send(_user);
      })
      .catch(next);
  }})
