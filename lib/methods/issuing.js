/* eslint camelcase: ["error", {properties: "never"}]*/
'use strict';

function createInstances(options, client, callback) {

  var opts = {
    path: options.path,
    data: options.data,
    default: []
  };

  client._remote.post(opts, callback);
}

function createBadgeInstance(options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  // POST /v1/issuer/issuers/{issuerSlug}/badges/{badgeSlug}/assertions + 3 form properties (in data object)
  options.path = options.path + '/' + options.issuerSlug + '/badges/' + options.badgeSlug + '/assertions';
  options.data = {
    recipient_identifier: options.recipient_identifier,
    evidence: options.evidence,
    create_notification: options.create_notification
  };

  createInstances (options, this, callback);
}

module.exports = {
  createBadgeInstance: createBadgeInstance
};

