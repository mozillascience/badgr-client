'use strict';

function findBadges (options, client, callback) {

  var opts = {
    path: options.path,
    default: []
  };

  client._remote.get(opts, callback);
}

var getAllBadges = function getAllBadges (callback) {

  var options = {};
  options.path = 'v1/issuer/all-badges';

  findBadges(options, this, callback);
};

module.exports = {
  getAllBadges: getAllBadges
};
