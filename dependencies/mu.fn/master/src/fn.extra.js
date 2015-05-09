define('mu.fn.pipe', function () {
  'use strict';
  
  var pipe = function () {
    var argv = [].slice.call(arguments),
        source = argv.shift();
    
    var piped = function () {
      return argv.reduce(function (acc, func) {
        return func(acc);
      }, source.apply(null, arguments));
    };
    
    return piped;
  };
  
  return pipe;
});

define('mu.fn.reverse', function () {
  'use strict';
  
  var reverse = function (func) {
    var reversed = function () {
      return func.apply(null, [].reverse.call(arguments));
    };
    
    return reversed;
  };
  
  return reverse;
});
