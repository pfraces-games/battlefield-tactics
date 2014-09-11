define('app.path.direction', function () {
  'use strict';

  var direction = function (from, to) {
    var north = from.y > to.y,
        south = from.y < to.y,
        east = from.x < to.x,
        west = from.x > to.x;

    var dir = '';

    if (north) { dir += 'N'; }
    if (south) { dir += 'S'; }
    if (east) { dir += 'E'; }
    if (west) { dir += 'W'; }

    return dir;
  };

  return direction;
});
