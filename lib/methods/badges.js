'use strict';

function findBadges (options, client, callback) {

  var opts = {
    path: options.path,
    default: []
  };

  client._remote.get(opts, callback);
}

var getAllBadges = function getAllBadges (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  findBadges(options, this, callback);
};

module.exports = {
  getAllBadges: getAllBadges
};
