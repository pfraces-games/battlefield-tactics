define('domo.css', function (require) {
  'use strict';
  
  var each = require('mu.list.each');
  
  var css = function (node, attrs) {
    each(attrs, function (value, attr) {
      node.style[attr] = value;
    });
  };
  
  return css;
});
