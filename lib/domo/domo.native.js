define('domo.native', function () {
  'use strict';
  
  var native = function (node, callback) {
    callback(node);
  };

  return native;
});
