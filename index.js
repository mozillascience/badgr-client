'use strict';

var Client = require('./lib/client');
var Remote = require('./lib/remote');

/**
 * Initialise a Client object as the main interface for operations with the remote API, and a Remote object that
 * encapsulates all the actual communication (get, post, put, delete) to the Badgr server.
 * @param endpoint the main URL for the Badgr server
 * @param auth object with username and password for basic auth (only type supported by the API).
 * @returns {Client}
 */
module.exports = function initClient(endpoint, auth) {
  var remote, client;
  remote = new Remote(endpoint, auth);
  client = new Client(remote);
  return client;
};
