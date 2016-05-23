'use strict';

var Index = require('../../index');
var expect = require('chai').expect;
var apiEndpoint = 'http://192.168.99.100:8000/'; // TODO (jos) read from environment || default
// These auth credentials are only valid for local dev server
var goodTestAuth = { username: '', password: ''}; // TODO (jos) read from .env

describe('A remote instance using low level _remote calls', function() {
  it('should return the openbadges v1 url', function (done) {
    new Index(apiEndpoint, goodTestAuth, function(err, client){
      expect(err).to.be.null;
      var opts = {
        path: '/json-ld/v1'
      };
      client._remote.get(opts, function(error, data){
        expect(error).to.be.null;
        expect(data).not.to.be.undefined;
        expect(data['@context'][0]).to.be.equal('https://w3id.org/openbadges/v1');
        done();
      });
    });
  });

});
