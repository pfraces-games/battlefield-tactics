define.root(function (require) {
  'use strict';

  var emitter = require('mu.api.emitter'),
      log = require('log');

  var channel = emitter();
  
  channel.emit('foo', 1, 2, 3);
  channel.on('foo', log);
  log('start');
});
