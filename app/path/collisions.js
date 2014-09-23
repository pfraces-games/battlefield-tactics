define('app.path.collisions', function (require) {
  'use strict';

  var reduce  = require('mu.list.reduce'),
      model   = require('app.model');

  var checkCollision = function (x, y) {
    var node = { x: x, y: y },
        cell = model.at(x, y);

    if (cell.character) { node.character = true; }
    else if (cell.terrain === 'L') { node.lake = true; }
    else if (cell.terrain === 'W') { node.wall = true; }
    else { return; }

    node.cell = cell;
    return node;
  };

  var collisions = function (path) {
    return reduce(path, [], function (acc, node, index) {
      if (index === 0) { return acc; }
      var collision = checkCollision(node.x, node.y);

      if (collision) {
        collision.index = index;
        acc[acc.length] = collision;
      }

      return acc;
    });
  };

  return collisions;
});
