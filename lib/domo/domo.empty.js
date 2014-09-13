define('domo.empty', function () {
  'use strict';

  var empty = function (node) {
    node.innerHTML = '';
  };

  return empty;
});
