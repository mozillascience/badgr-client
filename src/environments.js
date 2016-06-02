'use strict';

module.exports = (function () {
  var Habitat = require('habitat');
  Habitat.load('.env');
  Habitat.load('default.env'); // fallback; does not overwrite values from .env
  return new Habitat();
})();
