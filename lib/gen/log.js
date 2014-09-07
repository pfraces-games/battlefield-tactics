define('log', function () {
  'use strict';

  var log = function (msg, indent) {
    console.log(JSON.stringify(msg, null, indent));
  };

  return log;
});
