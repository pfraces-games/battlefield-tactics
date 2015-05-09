define('mu.async.events', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      apply     = require('mu.fn.apply'),
      defer     = require('mu.fn.defer'),
      each      = require('mu.list.each'),
      chain     = require('mu.api.chain');

  var on = function (listeners, event, listener) {
    if (!isDefined(listeners[event])) { listeners[event] = []; }
    listeners[event].push(listener);
  };

  var notify = function (msg) {
    return function (listener) {
      apply(listener, msg);
    };
  };

  var emit = defer(function (listeners, event /* , msg... */) {
    var msg = [].slice.call(arguments, 2);
    each(listeners[event], defer(notify(msg)));
    each(listeners.event, defer(notify([event].concat(msg))));
  });

  var events = function () {
    var listeners = {};

    return chain({
      on: on,
      emit: emit
    }, listeners);
  };

  return events;
});
