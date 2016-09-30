/* eslint camelcase: ["error", {properties: "never"}]*/
'use strict';

var Index = require('../../index');
var expect = require('chai').expect;
var env = require('../../src/environments');
var apiEndpoint = env.get('badgrApiEndpoint');
var goodTestAuth = { username: env.get('badgrUser'), password: env.get('badgrPass')};

describe('A higher level client using issuing methods', function() {

  it('should create a badge under the issuer passed in', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      badgeSlug: 'software',
      recipient_identifier: 'b@d.gr',
      evidence: 'http://example.com/noevidence',
      create_notification: 'true'
    };
    client.createBadgeInstance(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined;
      var returnedBadgeSlug = data.json.badge.split('/');
      expect(returnedBadgeSlug[returnedBadgeSlug.length - 1]).to.equal(opts.badgeSlug);
      done();
    });
  });

  it('should get all instances of a badge under the issuer passed in', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      badgeSlug: 'resources'
    };
    client.getBadgeInstancesByBadge(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

  it('should error out when not enough information is passed for a badge instance query', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science'
    };
    client.getBadgeInstancesByBadge(opts, function (err, data) {
      expect(err).not.to.be.null;
      expect(data).to.be.undefined;
      done();
    });
  });

  it('should get all instances of a badge, under the issuer, for a specific recipient', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      recipient: '0000-0002-3881-294X@orcid.org'
    };
    client.getBadgeInstancesByRecipient(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

  it('should get all badge instances for a particular paper (by paper doi)', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      evidence: 'http://dx.doi.org/10.1186/2047-217X-3-18'
    };
    client.getBadgeInstancesByEvidence(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

});
