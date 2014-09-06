define('mu.fn.bind', function () {
  'use strict';
  
  var bind = function () {
    var argv = [].slice.call(arguments),
        fn = argv.shift();
        
    var bound = function () {
      return fn.apply(null, [].concat.apply(argv, arguments));
    };
    
    return bound;
  };
  
  return bind;
});
