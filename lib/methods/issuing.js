/* eslint camelcase: ["error", {properties: "never"}]*/
'use strict';

var _ = require('lodash');

function createInstance(options, client, callback) {

  var opts = {
    path: 'v1/issuer/issuers/' + options.relative_path,
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
  options.relative_path = options.issuerSlug + '/badges/' + options.badgeSlug + '/assertions';
  options.data = {
    recipient_identifier: options.recipient_identifier,
    evidence: options.evidence,
    create_notification: options.create_notification
  };

  createInstance(options, this, callback);
}

function getInstances(options, client, callback) {

  var opts = {
    path: 'v1/issuer/issuers/' + options.relative_path,
    qs: options.qs,
    default: []
  };

  client._remote.get(opts, callback);
}

function getBadgeInstances(options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  if (!options.issuerSlug || !options.badgeSlug) {
    return callback(new Error('Not enough information to return Badge Instances; please review the issuer and badge slugs.'));
  }
  // GET /v1/issuer/issuers/{issuerSlug}/badges/{badgeSlug}/assertions
  options.relative_path = options.issuerSlug + '/badges/' + options.badgeSlug + '/assertions';
  getInstances(options, this, callback);
}

function getBadgeInstancesByRecipient(options, callback) {

  options.qs = {
    recipient: options.recipient
  };

  if (!options.issuerSlug || !options.recipient) {
    return callback(new Error('Not enough information to return Badge Instances by Recipient;' +
      'please review the issuer slug and recipient id.'));
  }

  // GET /v1/issuer/issuers/{issuerSlug}/assertions with issuerSlug='mozilla-science' and recipient='someId@orcid.org'
  options.relative_path = options.issuerSlug + '/assertions';
  getInstances(options, this, callback);

}

/**
 * There is no API call for evidence (which is used as DOI) so this method first grabs all badge instances, and then
 * filters by json.evidence field. TODO This may be a problem for scaling the system; keep an eye on it.
 */
function getBadgeInstancesByPaper(options, callback) {

  if (!callback) {
    callback = options;
    options = {};
  }

  if (!options.issuerSlug || !options.evidence) {
    return callback(new Error('Not enough information to return Badge Instances by Paper'));
  }

  // GET /v1/issuer/issuers/{issuerSlug}/assertions with issuerSlug='mozilla-science'
  options.relative_path = options.issuerSlug + '/assertions';
  getInstances(options, this, function(err, data){

    var byPaper = _.filter(data, function(badgeInstance) {
      if (badgeInstance.json && badgeInstance.json.evidence) {
        return badgeInstance.json.evidence === options.evidence;
      }
    });
    callback(err, byPaper);
  });
}

module.exports = {
  createBadgeInstance: createBadgeInstance,
  getBadgeInstances: getBadgeInstances,
  getBadgeInstancesByRecipient: getBadgeInstancesByRecipient,
  getBadgeInstancesByPaper: getBadgeInstancesByPaper
};

