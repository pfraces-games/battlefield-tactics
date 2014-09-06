define('mu.fn.apply', function () {
  'use strict';
  
  var apply = function (fn, argv) {
    return fn.apply(null, argv);
  };
  
  return apply;
});
