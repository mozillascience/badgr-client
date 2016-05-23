'use strict';

var Index = require('../../index');
var expect = require('chai').expect;
var apiEndpoint = 'http://192.168.99.100:8000/'; // TODO (jos) read from .env variable || default
var badAuth = { username: '', password: ''};
// These auth credentials are only valid for local dev server // TODO (jos) read from .env
var goodTestAuth = { username: '', password: ''};

describe('A library instance', function() {
  it('should return error for a call to the library with no user data', function (done) {
    new Index(apiEndpoint, null, function(err){
      expect(err).not.to.be.undefined;
      done();
    });
  });

  it('should return an error for a call with wrong username and password', function (done) {
    new Index(apiEndpoint, badAuth, function(err){
      expect(err).not.to.be.undefined;
      done();
    });
  });

  it('should return a token for a call with correct credentials', function (done) {
    new Index(apiEndpoint, goodTestAuth, function(err, client){
      if (err) { throw err; }
      expect(client).not.to.be.undefined;
      done();
    });
  });

});
