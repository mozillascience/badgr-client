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

  it('should return all badge instances when no additional filters are passed', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science'
    };
    client.getBadgeInstances(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined;
      done();
    });
  });

  it('should return all instances of a particular badge under the issuer passed in', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      badgeSlug: 'resources'
    };
    client.getBadgeInstances(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

  it('should return all instances of all badges, under the issuer, for a specific recipient', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      recipient: '0000-0002-3881-294X@orcid.org'
    };
    client.getBadgeInstances(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

  it('should return all badge instances for a particular evidence url', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      evidence: 'http://dx.doi.org/10.1186/2047-217X-3-18'
    };
    client.getBadgeInstances(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

  it('should return all instances of a particular badge, under the issuer, for a specific recipient', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      recipient: '0000-0002-3881-294X@orcid.org',
      badgeSlug: 'software'
    };
    client.getBadgeInstances(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

  it('should return all badge instances for a badge, and for a particular evidence url', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      badgeSlug: 'software',
      evidence: 'http://dx.doi.org/10.1186/2047-217X-3-18'
    };
    client.getBadgeInstances(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

  it('should return all badge instances for a recipient, and a particular evidence url', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      issuerSlug: 'mozilla-science',
      recipient: '0000-0002-3881-294X@orcid.org',
      evidence: 'http://dx.doi.org/10.1186/2047-217X-2-10'
    };
    client.getBadgeInstances(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined; // Even if it is empty, it means that the endpoint is working
      done();
    });
  });

});
