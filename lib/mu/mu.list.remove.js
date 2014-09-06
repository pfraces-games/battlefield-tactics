define('mu.list.remove', function (require) {
  'use strict';
  
  var indexOf   = require('mu.list.indexOf'),
      isDefined = require('mu.type.defined'),
      removeAt  = require('mu.list.removeAt');
  
  var remove = function (list, item) {
    var index = indexOf(list, item);
    if (isDefined(index)) { removeAt(list, index); }
    return index;
  };
  
  return remove;
});
