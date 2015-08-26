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
    var onChildRemoved, onChildChanged, onChildAdded,
        listeners = {};

    var addRemoveListener = function (id, listener) {
      if (!listeners[id]) { listeners[id] = {}; }
      listeners[id].onRemove = listener;
    };

    var addUpdateListener = function (id, listener) {
      if (!listeners[id]) { listeners[id] = {}; }
      listeners[id].onUpdate = listener;
    };

    var setupListeners = function () {
      list = node(list);

      onChildRemoved = list.on('child_removed', function (snapshot) {
        listeners[snapshot.key()].onRemove(listItem(snapshot));
      });

      onChildChanged = list.on('child_changed', function (snapshot) {
        listeners[snapshot.key()].onUpdate(listItem(snapshot));
      });

      onChildAdded = list.on('child_added', function (snapshot) {
        var onRemove = partial(addRemoveListener, snapshot.key()),
            onUpdate = partial(addUpdateListener, snapshot.key());
        fn(listItem(snapshot), onRemove, onUpdate);
      });
    };

    var releaseListeners = function () {
      list.off(onChildRemoved);
      list.off(onChildChanged);
      list.off(onChildAdded);
      list.reset();
    };

    session.onLogin(setupListeners);
    session.onLogout(releaseListeners);
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

  var save = function (list, idGetter, itemGetter) {
    return function () {
      var id = idGetter(),
          item = itemGetter();

      list = node(list);

      if (id) { list.child(id).update(item); }
      else { list.push(item); }
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
  	save: save,
    remove: remove
  };
});
