'use strict';

var client = require('../../index')({ username: 'jos', password: 'jos'});
var unInitialisedClient = require('../../index');
var expect = require('chai').expect;

describe('A client instance', function(){
  it('should throw and error for a uninitialised client', function () {
    expect(unInitialisedClient).to.throw(Error);
  });

  it('should be of type object', function () {
    expect(client).to.be.a('object');
  });
});

