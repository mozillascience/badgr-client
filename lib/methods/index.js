'use strict';

var methodSets = [
  require('./badges'),
  require('./issuing')
];

module.exports = methodSets.reduce(function(methods, set) {
  Object.keys(set).forEach(function(method) {
    methods[method] = set[method];
  });
  return methods;
}, {});
