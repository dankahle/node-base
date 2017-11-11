const Config = new require('../config'),
  config = new Config();

module.exports = function(err, req, res, next) {
    const _config = config.getConfig();
    const obj = Object.assign({}, err);
    if (err && err.message) {
        obj.message = err.message;
    }
  if (err && err.stack && _config.showStackWithErrors) {
        obj.stack = err.stack;
    }
    delete obj.statusCode;
    console.error(obj);
    res.status(err.statusCode || 500).send(obj);
};


