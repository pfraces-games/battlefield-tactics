define('domo.repeater', function (require) {
  'use strict';

  var append = require('domo.append'),
      remove = require('domo.remove'),
      clone  = require('domo.clone');
  
  var repeater = function (node) {
    var parent = node.parentNode,
        tpl = clone(node);

    remove(node);
    
    var repeat = function () {
      var copy = clone(tpl);
      append(parent, copy);
      return copy;
    };
  
    return repeat;
  };

  return repeater;
});
