define('mu.list.map', function (require) {
  'use strict';
  
  var each        = require('mu.list.each'),
      isArrayLike = require('mu.type.arrayLike');
  
  var map = function (list, fn) {
    var mapped = isArrayLike(list) ? [] : {};
    
    each(list, function (item, index) {
      mapped[index] = fn(item, index);
    });

    return mapped;
  };
  
  return map;
});
