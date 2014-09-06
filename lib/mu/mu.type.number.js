define('mu.type.number', function () {
  'use strict';
  
  var isNumber = function (arg) {
    return typeof arg === 'number';
  };
  
  return isNumber;
});
