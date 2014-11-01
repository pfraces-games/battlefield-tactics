define('matrix', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      partial   = require('mu.fn.partial'),
      listEach  = require('mu.list.each');

  var outOfBounds = function (width, height, x, y) {
    return (
      x < 0 ||
      x > width ||
      y < 0 ||
      y > height
    );
  };

  var at = function (matrix, pos, val) {
    var width = matrix[0].length,
        height = matrix.length,
        x = pos.x,
        y = pos.y;

    if (outOfBounds(width, height, x, y)) { return; }
    if (val) { matrix[y][x] = val; }
    
    return matrix[y][x];
  };

  var each = function (matrix, fn) {
    return listEach(matrix, function (row, y) {
      return listEach(row, function (cell, x) {
        var exit = fn(cell, { x: x, y: y });
        if (isDefined(exit)) { return exit; }
      });
    });
  };

  var map = function (matrix, fn) {
    var mapped = [];

    each(matrix, function (cell, pos) {
      var x = pos.x,
          y = pos.y;

      if (x === 0) { mapped[y] = []; }
      mapped[y][x] = fn(cell, pos);
    });

    return mapped;
  };

  var matrix = function (matrix) {
    return {
      at: partial(at, matrix),
      each: partial(each, matrix),
      map: partial(map, matrix)
    };
  };

  return matrix;
});
