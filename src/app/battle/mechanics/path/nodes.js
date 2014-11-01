define('app.mechanics.path.nodes', function (require) {
  'use strict';

  var map          = require('mu.list.map'),
      straightLine = require('straightLine'),
      cells        = require('app.model.cells');

  var nodes = function (from, to) {
    return map(straightLine(from, to), function (node) {
      return cells.at(node);
    });
  };
    
  return nodes;
});
