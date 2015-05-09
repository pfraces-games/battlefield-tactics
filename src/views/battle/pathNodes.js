define('app.battle.pathNodes', function (require) {
  'use strict';

  var map          = require('mu.list.map'),
      straightLine = require('straightLine'),
      cells        = require('battle.model.cells');

  var nodes = function (from, to) {
    return map(straightLine(from, to), function (node) {
      return cells.at(node);
    });
  };
    
  return nodes;
});
