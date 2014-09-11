define('app.path.collision', function (require) {
  'use strict';

  var each  = require('mu.list.each'),
      model = require('app.model');

  var checkCollision = function (cell) {
    if (cell.character) { return { character: true }; }
    if (cell.terrain === 'L') { return { lake: true }; }
    if (cell.terrain === 'W') { return { wall: true }; }
  };

  var collision = function (path) {
    return each(path, function (node, index) {
      if (index === 0) { return; }

      var cell = model.at(node.x, node.y),
          collision = checkCollision(cell);

      if (collision) {
        collision.index = index;
        return collision;
      }
    });
  };

  return collision;
});
