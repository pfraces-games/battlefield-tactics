define('domo.on', function () {
  'use strict';
  
  var on = function (node, event, fn) {
    return node.addEventListener(event, fn);
  };
  
  return on;
});
