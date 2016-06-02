'use strict';

var Index = require('../../index');
var expect = require('chai').expect;
var env = require('../../src/environments');
var apiEndpoint = env.get('badgrApiEndpoint');

describe('A library instance', function() {
  it('should return error for a call to the library with no auth data', function () {
    expect(function() { new Index(apiEndpoint, null); }).to.throw(Error);
  });

  it('should initialise correctly, even with empty auth data', function () {
    expect(function() { new Index(apiEndpoint, {}); }).not.to.throw();
  });

  it('should return error for a call to the library with no api endpoint', function () {
    expect(function() { new Index(null, {}); }).to.throw(Error);
  });

  it('should contain functions from the methods mixin', function () {
    var library;
    expect(function() { library = new Index(apiEndpoint, {}); }).not.to.throw(Error);
    expect(library.getAllBadges).not.to.be.undefined;
  });
});
