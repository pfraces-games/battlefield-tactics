define('mu.list.contains', function (require) {
  'use strict';
  
  var indexOf   = require('mu.list.indexOf'),
      isDefined = require('mu.type.defined');
  
  var contains = function (list, item) {
    return isDefined(indexOf(list, item));
  };
  
  return contains;
});
