'use strict';

var Index = require('../../index');
var expect = require('chai').expect;
var apiEndpoint = 'http://192.168.99.100:8000/'; // TODO (jos) read from .env variable || default

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
});
