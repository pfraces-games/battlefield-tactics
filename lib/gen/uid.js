define('uid', function () {
  'use strict';

  var uid = function (fn) {
    var counter = 0;

    var next = function () {
      var current = fn ? fn(counter) : counter;
      counter++;
      return current;
    };

    return next;
  };

  return uid;
});
