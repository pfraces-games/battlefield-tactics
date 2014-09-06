define('mu.list.removeAt', function (require) {
  'use strict';
  
  var isArrayLike = require('mu.type.arrayLike');
  
  var removeAt = function (list, index) {
    var removed;
    
    if (isArrayLike(list)) {
      removed = ([].splice.call(list, index, 1))[0];
    } else {
      removed = list[index];
      delete list[index];
    }
    
    return removed;
  };
  
  return removeAt;
});
