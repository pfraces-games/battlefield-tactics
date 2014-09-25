define('app.path.nodes', function (require) {
  'use strict';

  var map          = require('mu.list.map'),
      straightLine = require('straightLine'),
      mapModel     = require('app.model.map');

  var nodes = function (from, to) {
    return map(straightLine(from, to), function (node) {
      return mapModel.at(node);
    });
  };
    
  return nodes;
});
