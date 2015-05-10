define('app.battle.model.cells', function (require) {
  'use strict';

  var matrix = require('matrix'),
      map    = require('app.battle.model.map');

  var cells = matrix(map).map(function (terrain, pos) {
    return {
      terrain: terrain,
      pos: pos
    };
  });

  var model = function (update) {
    if (update) { cells = update; }
    return cells;
  };

  var buffer = matrix(cells);

  return {
    model: model,
    at: buffer.at,
    each: buffer.each,
    map: buffer.map
  };
});
