define('mu.fn.multiplex', function (require) {
  'use strict';
  
  var multiplex = function (fn) {
    return function () {
      var argv = [].slice.call(arguments),
          arr = argv.shift();
          
      arr.forEach(function (item) {
        fn.bind(null, item).apply(null, argv);
      });
    };
  };
  
  return multiplex;
});
