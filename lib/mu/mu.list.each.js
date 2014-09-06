define('mu.list.each', function (require) {
  'use strict';
  
  var isDefined   = require('mu.type.defined'),
      isArrayLike = require('mu.type.arrayLike');
  
  var iterateArray = function (arr, fn) {
    for (var index = 0, len = arr.length; index < len; index++) {
      var exit = fn(arr[index], index);
      if (isDefined(exit)) { return exit; }
    }
  };
  
  var iterateObject = function (obj, fn) {
    for (var prop in obj) {
      var exit = fn(obj[prop], prop);
      if (isDefined(exit)) { return exit; }
    }
  };
  
  var each = function (list, fn) {
    if (isArrayLike(list)) { return iterateArray(list, fn); }
    return iterateObject(list, fn);
  };
  
  return each;
});
