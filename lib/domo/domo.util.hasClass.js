define('domo.util.hasClass', function (require) {
  'use strict';
  
  var classList = require('domo.util.classList'),
      contains  = require('mu.list.contains');
  
  var hasClass = function (node, className) {
    return contains(classList(node), className); 
  };
  
  return hasClass;
});
