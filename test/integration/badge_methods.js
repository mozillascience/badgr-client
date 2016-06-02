'use strict';

var Index = require('../../index');
var expect = require('chai').expect;
var env = require('../../src/environments');
var apiEndpoint = env.get('badgrApiEndpoint');
var goodTestAuth = env.get('badgrCredentials');

describe('A higher level client using badge methods', function() {

  it('should return data when calling all badges', function (done) {
    var client = new Index(apiEndpoint, goodTestAuth);

    var opts = {
      path: 'v1/issuer/all-badges'
    };
    client.getAllBadges(opts, function (err, data) {
      expect(err).to.be.null;
      expect(data).not.to.be.undefined;
      expect(data[0].created_at).not.to.be.undefined;
      done();
    });
  });

});
