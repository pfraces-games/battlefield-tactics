define('log', function () {
  'use strict';

  var log = (function () {
    var last = 0;

    return function () {
      var args = [].slice.call(arguments),
          now = (new Date()).getTime(),
          diff = 0,
          msg = [];
      
      if (!last) { last = now; }

      diff = now - last;
      msg = msg.concat('[' + diff + ' ms]', args);
      last = now;

      console.log.apply(console, msg);
    };
  })();

  return log;
});
