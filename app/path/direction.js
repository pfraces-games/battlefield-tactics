define('app.path.direction', function () {
  'use strict';

  var direction = function (from, to) {
    var north = from.y > to.y,
        south = from.y < to.y,
        east = from.x < to.x,
        west = from.x > to.x;

    var dir = '';

    if (north) { dir += 'north'; }
    if (south) { dir += 'south'; }
    if (east) { dir += 'east'; }
    if (west) { dir += 'west'; }

    return dir;
  };

  return direction;
});
