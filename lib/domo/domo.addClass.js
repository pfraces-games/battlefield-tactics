define('domo.addClass', function (require) {
  'use strict';
  
  var classList = require('domo.util.classList'),
      contains  = require('mu.list.contains');
  
  var addClass = function (node, className) {
    var list = classList(node);
    
    if (contains(list, className)) { return }
    
    list.push(className);
    node.className = list.join(' ');
  };
  
  return addClass;
});
