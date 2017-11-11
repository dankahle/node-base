const _ = require('lodash');


const defaults = {
  showStackWithErrors: false
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
