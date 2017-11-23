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
    // we're merging into this in places, need keep this immutable
    return this.config;
  }

  setConfig(settings) {
    _.merge(this.config, settings);
  }
}

module.exports = Config;
