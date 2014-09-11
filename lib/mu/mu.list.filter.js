define('mu.list.filter', function (require) {
  'use strict';
  
  var each        = require('mu.list.each'),
      isArrayLike = require('mu.type.arrayLike');
  
  var filter = function (list, fn) {
    var isArray = isArrayLike(list),
        filtered = isArray ? [] : {};
    
    each(list, function (item, index) {
      if (!fn(item, index)) { return; }
      
      if (isArray) { filtered.push(item); }
      else { filtered[index] = item; }
    });
    
    return filtered;
  };
  
  return filter;
});
