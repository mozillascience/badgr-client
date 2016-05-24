'use strict';

var methodsAsPrototype = require('./methods');

function Client(remote) {
  if (!remote) { throw new Error('Client needs a Remote object to be provided'); }
  if (!(this instanceof Client)) {
    return new Client(remote);
  }

  Object.defineProperties(this, {
    '_remote': {
      value: remote
    },
    '_path': {
      value: ''
    }
  });
}

Client.prototype = Object.create(methodsAsPrototype);
Client.prototype.constructor = Client;

module.exports = Client;
