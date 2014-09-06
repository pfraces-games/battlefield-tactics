define('domo.util.classList', function () {
  'use strict';
  
  var classList = function (node) {
    var raw = node.className,
        list = raw.length ? raw.split(' ') : [];
    
    return list;
  };
  
  return classList;
});
