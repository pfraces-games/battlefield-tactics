define('mu.list.range', function (require) {
  'use strict';

  var range = function (boundary, fn) {
    var list = [],
        backward = boundary < 0,
        length = Math.abs(boundary);

    for (var it = 0; it < length; it++) {
      var current = backward ? -it : it;
      list[it] = fn ? fn(current) : current;
    }

    return list;
  };

  return range;
});
