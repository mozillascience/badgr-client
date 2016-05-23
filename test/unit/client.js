'use strict';

var Client = require('../../lib/client');
var expect = require('chai').expect;

describe('A client instance', function(){
  it('should throw if no _remote object is provided', function () {
    expect(function(){ new Client(null); }).to.throw(Error);
  });

  it('should be initialised with a _remote object', function () {
    var fakeRemote = { remote: 'thisRemote'};
    var clientWithRemote = new Client(fakeRemote);
    expect(clientWithRemote._remote).to.be.equal(fakeRemote);
  });
});

