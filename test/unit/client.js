'use strict';

var client = require('../../index');
var expect = require('chai').expect;

describe('A client instance', function(){
  it('should be of type object', function () {
    expect(client).to.be.a('object');
  });
});

