/* eslint camelcase: ["error", {properties: "never"}]*/
'use strict';

function createInstance(options, client, callback) {

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

  createInstance(options, this, callback);
}

function getInstances(options, client, callback) {

  var opts = {
    path: options.path,
    default: []
  };

  client._remote.get(opts, callback);
}

function getBadgeInstances(options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  if (!options.path || !options.issuerSlug || !options.badgeSlug) {
    return callback(new Error('Not enough information to return Badge Instances; please review the issuer and badge slugs.'));
  }
  // GET /v1/issuer/issuers/{issuerSlug}/badges/{badgeSlug}/assertions
  options.path = options.path + '/' + options.issuerSlug + '/badges/' + options.badgeSlug + '/assertions';
  getInstances(options, this, callback);
}

module.exports = {
  createBadgeInstance: createBadgeInstance,
  getBadgeInstances: getBadgeInstances
};

