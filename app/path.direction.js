define('app.path.direction', function (path) {
  'use strict';

  var direction = function (path) {
    var start = path[0],
        next = path[1];

    var north = start.y > next.y,
        south = start.y < next.y,
        east = start.x < next.x,
        west = start.x > next.x;

    var dir = '';

    if (north) { dir += 'N'; }
    if (south) { dir += 'S'; }
    if (east) { dir += 'E'; }
    if (west) { dir += 'W'; }

    return dir;
  };

  return direction;
});
