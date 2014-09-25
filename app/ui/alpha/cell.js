define('app.ui.cell', function (require) {
  'use strict';

  var uid = require('uid');

  var CANVAS_WIDTH = 16,
      CANVAS_HEIGHT = 12,
      CELL_PREFIX = 'cell_';

  var id = uid(function (id) {
    return CELL_PREFIX + id;
  });

  var idPos = function (domId) {
    var nodeId = parseInt(domId.slice(CELL_PREFIX.length), 10),
        x = nodeId % CANVAS_WIDTH,
        y = parseInt(nodeId / CANVAS_WIDTH, 10);

    return {
      x: x,
      y: y
    };
  };

  var posId = function (pos) {
    var nodeId = (pos.y * CANVAS_WIDTH) + pos.x,
        domId = CELL_PREFIX + nodeId;

    return domId;
  };

  return {
    id: id,
    idPos: idPos,
    posId: posId
  };
});
