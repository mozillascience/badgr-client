'use strict';

module.exports = (function (prefix) {
  var Habitat = require('habitat');
  Habitat.load('.env');
  Habitat.load('default.env');
  return new Habitat(prefix);
})();
