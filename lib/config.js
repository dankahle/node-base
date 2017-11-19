const _ = require('lodash');


const defaults = {
  "errors": {},
  "middleware": {
    "authenticate": {},
    "errorHandler": {
      "showStackWithErrors": false,
    },
    "notFound": {},
  },
  "config": {},
  "validate": {}
}

class Config {

  constructor(settings) {
    this.config = _.merge(defaults, settings);
  }

  getConfig() {
    return this.config;
  }

  setConfig(settings) {
    _.merge(this.config, settings);
  }
}

module.exports = Config;
