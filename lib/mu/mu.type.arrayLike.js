define('mu.type.arrayLike', function (require) {
  'use strict';
  
  var isNumber = require('mu.type.number');
  
  var isArrayLike = function (arg) {
    return arg && isNumber(arg.length);
  };
  
  return isArrayLike;
});
