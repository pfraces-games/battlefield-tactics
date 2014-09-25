define('app.model.map', function (require) {
  'use strict';

  var matrix = require('matrix'),
      map    = require('app.map.river');

  var buffer = matrix(map).map(function (terrain, pos) {
    return {
      terrain: terrain,
      pos: pos
    };
  });

  var buffer = matrix(buffer);

  return {
    at: buffer.at,
    each: buffer.each,
    map: buffer.map
  };
});
