define('mu.fn.apply', function () {
  'use strict';
  
  var apply = function (fn, args) {
    return fn.apply(null, args);
  };
  
  return apply;
});

define('mu.fn.partial', function () {
  'use strict';

  var slice = [].slice;

  var partial = function (fn /* , args... */) {
    var args = slice.call(arguments, 1);
        
    return function () {
      return fn.apply(null, args.concat(slice.call(arguments)));
    };
  };
  
  return partial;
});

define('mu.fn.defer', function () {
  'use strict';

  var defer = function (fn) {
    return function (/* args... */) {
      var args = arguments;

      setTimeout(function () {
        fn.apply(null, args);
      }, 0);
    };
  };

  return defer;
});

define('mu.fn.debounce', function () {
  'use strict';

  var debounce = function (fn, delay) {
    var timer = null;

    return function (/* args... */) {
      var args = arguments;
      clearTimeout(timer);

      timer = setTimeout(function () {
        fn.apply(null, args);
      }, delay || 0);
    };
  };

  return debounce;
});

define('mu.fn', function (require) {
  'use strict';
  
  return {
    apply    : require('mu.fn.apply'),
    partial  : require('mu.fn.partial'),
    defer    : require('mu.fn.defer'),
    debounce : require('mu.fn.debounce')
  };
});
