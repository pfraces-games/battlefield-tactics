define('domo.removeClass', function (require) {
  'use strict';
  
  var classList = require('domo.util.classList'),
      isDefined = require('mu.type.defined'),
      remove    = require('mu.list.remove');
  
  var removeClass = function (node, className) {
    var list = classList(node);
    if (!isDefined(remove(list, className))) { return; }
    node.className = list.join(' ');
  };
  
  return removeClass;
});
