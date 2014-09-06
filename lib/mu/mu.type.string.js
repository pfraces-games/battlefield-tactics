define('mu.type.string', function () {
  'use strict';
  
  var isString = function (arg) {
    return typeof arg === 'string';
  };
  
  return isString;
});
