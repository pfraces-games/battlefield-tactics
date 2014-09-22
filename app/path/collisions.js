define('app.path.collisions', function (require) {
  'use strict';

  var reduce  = require('mu.list.reduce'),
      model   = require('app.model');

  var checkCollision = function (node) {
    var cell = model.at(node.x, node.y);
    if (cell.character) { return { character: node }; }
    if (cell.terrain === 'L') { return { lake: node }; }
    if (cell.terrain === 'W') { return { wall: node }; }
  };

  var collisions = function (path) {
    return reduce(path, [], function (acc, node, index) {
      if (index === 0) { return acc; }
      var collision = checkCollision(node);

      if (collision) {
        collision.index = index;
        acc[acc.length] = collision;
      }

      return acc;
    });
  };

  return collisions;
});
