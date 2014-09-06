define('matrix', function (require) {
  'use strict';

  var listEach  = require('mu.list.each'),
      isDefined = require('mu.type.defined'),
      bind      = require('mu.fn.bind');

  var outOfBounds = function (width, height, x, y) {
    return (
      x < 0 ||
      x > width ||
      y < 0 ||
      y > height
    );
  };

  var at = function (matrix, x, y, val) {
    var width = matrix[0].length,
        height = matrix.length;

    if (outOfBounds(width, height, x, y)) { return; }
    if (val) { matrix[y][x] = val; }
    
    return matrix[y][x];
  };

  var each = function (matrix, fn) {
    return listEach(matrix, function (row, y) {
      return listEach(row, function (cell, x) {
        var exit = fn(cell, x, y);
        if (isDefined(exit)) { return exit; }
      });
    });
  };

  var map = function (matrix, fn) {
    var mapped = [];

    each(matrix, function (cell, x, y) {
      if (x === 0) { mapped[y] = []; }
      mapped[y][x] = fn(cell, x, y);
    });

    return mapped;
  };

  var matrix = function (matrix) {
    return {
      at: bind(at, matrix),
      each: bind(each, matrix),
      map: bind(map, matrix)
    };
  };

  return matrix;
});
