define('mu.list.indexOf', function (require) {
  'use strict';
  
  var isArrayLike = require('mu.type.arrayLike'),
      each        = require('mu.list.each');
  
  var indexOfArray = function (list, item) {
    var index = [].indexOf.call(list, item);
    if (index === -1) { return; }
    return index;
  };
  
  var indexOfObject = function (list, item) {
    return each(list, function (currentItem, currentIndex) {
      if (currentItem === item) { return currentIndex; }
    });
  };
  
  var indexOf = function (list, item) {
    if (isArrayLike()) { return indexOfArray(list, item); }
    return indexOfObject(list, item);
  };
  
  return indexOf;
});
