'use strict';

var Client = require('./lib/client');
var Remote = require('./lib/remote');
var request = require('request');

/**
 * Initialise a Client object as the main interface for operations with the remote API, and a Remote object that
 * encapsulates all the actual communication (get, post, put, delete) to the Badgr server.
 * @param endpoint the main URL for the Badgr server
 * @param auth object with username and password for basic auth (only scheme supported).
 * @param callback a callback to return results authentication errors or an instance of the Client
 * @returns {Client}
 */
module.exports = function initClient(endpoint, auth, callback) {
  var remote, client;
  // This config object is only for the first authorisation call
  var config = {
    url: endpoint + 'api-auth/token',
    method: 'post',
    formData: auth
  };

  request(config, function (err, rsp, body) {
    if (err) { return callback(err); }
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return callback(e);
      }
    }
    if (body && body.token) {
      remote = new Remote(endpoint, auth);
      client = new Client(remote);
      return callback(null, client);
    } else {
      return callback(new Error(JSON.stringify(body)));
    }
  });

};
