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
  // Types of filtering:
  // Badgr-server allows filtering by Badge class and by Recipient separately, but not by Evidence.
  // If there's no filtering, get all instances (1 function: number 0)
  // If there's only one type, we have a function for each (3 functions: number 1, 2, and 4).
  // If there's more than one type (4 functions):
  //   Badge + Recipient = sort by Recipient and filter by badge (less recipients expected) (number 3)
  //   Badge + Evidence = sort by badge and filter evidence (number 5)
  //   Recipient + Evidence = sort by Recipient and filter by Evidence (number 6)
  //   Badge + Recipient + Evidence = sort by Recipient (less expected) and then filter by the other two (number 7)

  // Calculate a number from 0 to 7 depending on the options passed
  // This is a binary conversion: evidenceFlag*4 + recipientFlag*2 + badgeSlugFlag*1 where the flags can be 0 or 1.
  var evidenceFlag, recipientFlag, badgeSlugFlag;
  evidenceFlag = options.evidence ? 4 : 0;
  recipientFlag = options.recipient ? 2 : 0;
  badgeSlugFlag = options.badgeSlug ? 1 : 0;

  var caseValue = evidenceFlag + recipientFlag + badgeSlugFlag;

  switch (caseValue) {
  case 0:
    getAllBadgeInstances(options, this, callback);
    break;
  case 1:
    getBadgeInstancesByBadge(options, this, callback);
    break;
  case 2:
    getBadgeInstancesByRecipient(options, this, callback);
    break;
  case 3:
    getBadgeInstancesByRecipientAndBadge(options, this, callback);
    break;
  case 4:
    getBadgeInstancesByEvidence(options, this, callback);
    break;
  case 5:
    getBadgeInstancesByBadgeAndEvidence(options, this, callback);
    break;
  case 6:
    getBadgeInstancesByRecipientAndEvidence(options, this, callback);
    break;
  case 7:
    getBadgeInstancesByRecipientAndEvidenceAndBadge(options, this, callback);
    break;
  default:
    console.log('This should never happen');
    callback(new Error('getBadgeInstances called with wrongn number of flags for filtering'));
  }
}

function getAllBadgeInstances(options, client, callback) {
  if (!options && !client && !callback) {
    throw new Error('All parameters are needed: options, client, and callback');
  }

  if (!options.issuerSlug) {
    return callback(new Error('Not enough information to return Badge Instances; please review the issuer slug.'));
  }
  // GET /v1/issuer/issuers/{issuerSlug}/assertions
  options.relative_path = options.issuerSlug + '/assertions';
  getInstances(options, client, callback);
}

function getBadgeInstancesByBadge(options, client, callback) {
  if (!options && !client && !callback) {
    throw new Error('All parameters are needed: options, client, and callback');
  }

  if (!options.issuerSlug || !options.badgeSlug) {
    return callback(new Error('Not enough information to return Badge Instances; please review the issuer and badge slugs.'));
  }
  // GET /v1/issuer/issuers/{issuerSlug}/badges/{badgeSlug}/assertions
  options.relative_path = options.issuerSlug + '/badges/' + options.badgeSlug + '/assertions';
  getInstances(options, client, callback);
}

function getBadgeInstancesByRecipient(options, client, callback) {

  if (!options && !client && !callback) {
    throw new Error('All parameters are needed: options, client, and callback');
  }

  options.qs = {
    recipient: options.recipient
  };

  if (!options.issuerSlug || !options.recipient) {
    return callback(new Error('Not enough information to return Badge Instances by Recipient;' +
      'please review the issuer slug and recipient id.'));
  }

  // GET /v1/issuer/issuers/{issuerSlug}/assertions with issuerSlug='mozilla-science' and recipient='someId@orcid.org'
  options.relative_path = options.issuerSlug + '/assertions';
  getInstances(options, client, callback);

}

function getBadgeInstancesByRecipientAndBadge(options, client, callback) {

  if (!options && !client && !callback) {
    throw new Error('All parameters are needed: options, client, and callback');
  }

  options.qs = {
    recipient: options.recipient
  };

  if (!options.issuerSlug || !options.recipient || !options.badgeSlug) {
    return callback(new Error('Not enough information to return Badge Instances by Recipient and Badge;' +
      'please review the issuer and badge slugs, and recipient id.'));
  }

  // This is basically filter by recipient, with an additional filtering step for Badge class
  // GET /v1/issuer/issuers/{issuerSlug}/assertions with issuerSlug='mozilla-science' and recipient='someId@orcid.org'
  options.relative_path = options.issuerSlug + '/assertions';
  getInstances(options, client, function(err, data) {
    if (err) {
      return callback(err);
    }
    var filteredByBadge = data.filter(function(item) {
      if (_.endsWith(item.badge_class, options.badgeSlug)) {
        return item.badge_class;
      }
    });
    callback(null, filteredByBadge);
  });

}

/**
 * There is no API call for evidence (which is used as DOI) so this method first grabs all badge instances, and then
 * filters by json.evidence field. TODO This may be a problem for scaling the system; keep an eye on it.
 */
function getBadgeInstancesByEvidence(options, client, callback) {

  if (!options && !client && !callback) {
    throw new Error('All parameters are needed: options, client, and callback');
  }

  if (!options.issuerSlug || !options.evidence) {
    return callback(new Error('Not enough information to return Badge Instances by Evidence'));
  }

  // GET /v1/issuer/issuers/{issuerSlug}/assertions with issuerSlug='mozilla-science'
  options.relative_path = options.issuerSlug + '/assertions';
  getInstances(options, client, function(err, data){

    if (err) {
      return callback(err);
    }

    var byEvidence = _.filter(data, function(badgeInstance) {
      if (badgeInstance.json && badgeInstance.json.evidence) {
        return badgeInstance.json.evidence === options.evidence;
      }
    });
    callback(null, byEvidence);
  });
}

function getBadgeInstancesByBadgeAndEvidence(options, client, callback) {
  if (!options && !client && !callback) {
    throw new Error('All parameters are needed: options, client, and callback');
  }

  if (!options.issuerSlug || !options.badgeSlug || !options.evidence) {
    return callback(new Error('Not enough information to return Badge Instances; ' +
      'please review the issuer and badge slugs, and the evidence url.'));
  }

  // This is basically return by Badge class with an added step to filter by Evidence
  // GET /v1/issuer/issuers/{issuerSlug}/badges/{badgeSlug}/assertions
  options.relative_path = options.issuerSlug + '/badges/' + options.badgeSlug + '/assertions';
  getInstances(options, client, function(err, data) {
    if (err) {
      return callback(err);
    }

    var byEvidence = _.filter(data, function(badgeInstance) {
      if (badgeInstance.json && badgeInstance.json.evidence) {
        return badgeInstance.json.evidence === options.evidence;
      }
    });
    callback(null, byEvidence);
  });
}

function getBadgeInstancesByRecipientAndEvidence(options, client, callback) {

  if (!options && !client && !callback) {
    throw new Error('All parameters are needed: options, client, and callback');
  }

  options.qs = {
    recipient: options.recipient
  };

  if (!options.issuerSlug || !options.recipient || !options.evidence) {
    return callback(new Error('Not enough information to return Badge Instances by Recipient and Evidence url;' +
      'please review the issuer slug, evidence url, and recipient id.'));
  }

  // This is basically filter by recipient, with an additional filtering step for Evidence
  // GET /v1/issuer/issuers/{issuerSlug}/assertions with issuerSlug='mozilla-science' and recipient='someId@orcid.org'
  options.relative_path = options.issuerSlug + '/assertions';
  getInstances(options, client, function(err, data) {
    if (err) {
      return callback(err);
    }
    var byEvidence = _.filter(data, function(badgeInstance) {
      if (badgeInstance.json && badgeInstance.json.evidence) {
        return badgeInstance.json.evidence === options.evidence;
      }
    });
    callback(null, byEvidence);
  });
}

function getBadgeInstancesByRecipientAndEvidenceAndBadge(options, client, callback) {

  if (!options && !client && !callback) {
    throw new Error('All parameters are needed: options, client, and callback');
  }

  options.qs = {
    recipient: options.recipient
  };

  if (!options.issuerSlug || !options.recipient || !options.evidence || !options.badgeSlug) {
    return callback(new Error('Not enough information to return Badge Instances by Recipient, Evidence url and Badge;' +
      'please review the issuer and badge slugs, evidence url, and recipient id.'));
  }

  // This is basically filter by recipient, with an additional filtering step for Evidence, and another one for Badge
  // GET /v1/issuer/issuers/{issuerSlug}/assertions with issuerSlug='mozilla-science' and recipient='someId@orcid.org'
  options.relative_path = options.issuerSlug + '/assertions';
  getInstances(options, client, function(err, data) {
    if (err) {
      return callback(err);
    }
    var byEvidence = _.filter(data, function(badgeInstance) {
      if (badgeInstance.json && badgeInstance.json.evidence) {
        return badgeInstance.json.evidence === options.evidence;
      }
    });

    var byBadge = byEvidence.filter(function(item) {
      if (_.endsWith(item.badge_class, options.badgeSlug)) {
        return item.badge_class;
      }
    });
    callback(null, byBadge);

  });
}

module.exports = {
  createBadgeInstance: createBadgeInstance,
  getBadgeInstances: getBadgeInstances
};

