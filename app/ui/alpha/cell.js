define('app.ui.cell', function (require) {
  'use strict';

  var uid = require('uid');

  var CANVAS_WIDTH = 16,
      CANVAS_HEIGHT = 12,
      CELL_PREFIX = 'cell_';

  var newId = uid(function (id) {
    return CELL_PREFIX + id;
  });

  var pos = function (nodeId) {
    var id = parseInt(nodeId.slice(CELL_PREFIX.length), 10),
        x = id % CANVAS_WIDTH,
        y = parseInt(id / CANVAS_WIDTH, 10);

    return {
      x: x,
      y: y
    };
  };

  var id = function (pos) {
    var id = (pos.y * CANVAS_WIDTH) + pos.x,
        nodeId = CELL_PREFIX + id;

    return nodeId;
  };

  return {
    newId: newId,
    pos: pos,
    id: id
  };
});
