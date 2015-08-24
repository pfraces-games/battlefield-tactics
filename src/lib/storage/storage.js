define('storage', function (require) {
  'use strict';

  var isDefined  = require('mu.is.defined'),
      isString   = require('mu.is.string'),
      isFunction = require('mu.is.function'),
      partial    = require('mu.fn.partial'),
      firebase   = require('storage.firebase'),
      session    = require('storage.session');

  var node = function (node) {
    if (isString(node)) { return firebase.child(node); }
    if (isFunction(node)) { return firebase.child(node()); }
    return node;
  };

  var listItem = function (snapshot) {
    var item = snapshot.val();
        item.id = snapshot.key();

    return item;
  };

  var each = function (list, fn) {
    var listeners = {};

    var onRemove = function (id, listener) {
      listeners[id] = listener;
    };

    var setupListeners = function () {
      list = node(list);

      list.on('child_removed', function (snapshot) {
        listeners[snapshot.key()]();
      });

      list.on('child_added', function (snapshot) {
        fn(listItem(snapshot), partial(onRemove, snapshot.key()));
      });
    };

    session.onLogin(setupListeners);
  };

  var filter = function (list, attr, fn) {
    var filter = function (attr) {
      if (attr === 'id') { return node(list).orderByKey(); }
      return node(list).orderByChild(attr);
    };

    return function (value) {
      fn();

      if (!isDefined(value)) { return; }

      filter(attr).equalTo(value)
      .once('child_added', function (snapshot) {
        fn(listItem(snapshot));
      });
    };
  };

  var insert = function (list, itemGetter) {
    return function () {
      node(list).push(itemGetter());
    };
  };

  var remove = function (list, itemIdGetter) {
    return function () {
      node(list).child(itemIdGetter()).remove();
    };
  };

  return {
    each: each,
  	filter: filter,
  	insert: insert,
    remove: remove
  };
});
