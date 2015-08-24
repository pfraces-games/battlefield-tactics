define('storage', function (require) {
  'use strict';

  var isString = require('mu.is.string'),
      firebase = require('storage.firebase');

  var node = function (node) {
    return isString(node) ? firebase.child(node) : node;
  };

  var listItem = function (snapshot) {
    var item = snapshot.val();
        item.id = snapshot.key();

    return item;
  };

  var each = function (list, fn) {
    list = node(list);

    list.on('child_added', function (snapshot) {
      fn(listItem(snapshot));
    });
  };

  var filter = function (list, attr, fn) {
    list = node(list);

    var filter = function (attr) {
      if (attr === 'id') { return list.orderByKey(); }
      return list.orderByChild(attr);
    };

    return function (value) {
      fn();

      filter(attr).equalTo(value)
      .once('child_added', function (snapshot) {
        fn(listItem(snapshot));
      });
    };
  };

  var insert = function (list, item) {
    list = node(list);
    list.push(item);
  };

  return {
    each: each,
  	filter: filter,
  	insert: insert
  };
});
