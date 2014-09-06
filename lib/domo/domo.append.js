define('domo.append', function () {
  'use strict';

  var append = function (node, content) {
    node.innerHTML += content;
  };

  return append;
});
