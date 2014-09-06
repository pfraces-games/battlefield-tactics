define('app.model', function (require) {
  'use strict';

  var matrix = require('matrix'),
      map    = require('app.map.river');

  var buffer = matrix(map).map(function (cell) {
    return { terrain: cell };
  });

  var model = matrix(buffer);

  return model;
});
