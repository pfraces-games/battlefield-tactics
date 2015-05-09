define('model.object', function (require) {
  'use strict';

  var isDefined  = require('mu.is.defined'),
      isFunction = require('mu.is.function'),
      partial    = require('mu.fn.partial'),
      map        = require('mu.list.reduce'),
      events     = require('mu.async.events');

  var getterSetter = function (channel, model, attr, newVal) {
    if (isDefined(newVal)) {
      channel.emit(attr, newVal, model[attr]);
      model[attr] = newVal;
    }

    return model[attr];
  };

  var object = function (config) {
    var channel = events();

    var model = function () {
      return map(config, function (item) {
        if (isFunction(item)) { return item(model); };
        return item;
      });
    };

    each(config, function (item, index) {
      model[index] = (isFunction(item)
        ? partial(item, model)
        : partial(getterSetter, channel, config, index)
      );
    });

    model.on = channel.on;
    model.emit = channel.emit;
  };

  return object;
});

define('model.array', function (require) {
  'use strict';

  var partial = require('mu.fn.partial'),
      each    = require('mu.list.each'),
      map     = require('mu.list.reduce'),
      remove  = require('mu.list.remove'),
      indexOf = require('mu.list.indexOf'),
      events  = require('mu.async.events');

  var identity = function (arg) {
    return arg;
  };

  var mixin = function (target) {
    return function (item, index) {
      target[index] = item;
    };
  };

  var array = function (config) {
    var data = [],
        channel = events();

    var model = function () {
      return map(data, function (item) {
        if (isFunction(item)) { return item(model); };
        return item;
      });
    };

    each(config, function (item, index) {
      model[index] = partial(item, model);
    });

    model.change = function (item, newVal) {
      var index = indexOf(data, item);
      data[index] = newVal;
      channel.emit('change', newVal, item);
    };

    model.update = function (item, newVal) {
      model.change(item, each(newVal, mixin(item)));
    };

    model.remove = function (item) {
      remove(data, item);
      channel.emit('remove', item);
    };

    model.item = function (item) {
      return {
        value: partial(identity, item),
        change: partial(model.change, item),
        update: partial(model.update, item),
        remove: partial(model.remove, item)
      };
    };

    model.insert = function (item) {
      data.push(item);
      channel.emit('insert', model.item(item));
    };

    model.on = channel.on;
    model.emit = channel.emit;

    return model;
  };

  return array;
});

define('model', function (require) {
  'use strict';

  return {
    model : require('model.object'),
    array : require('model.array')
  };
});
