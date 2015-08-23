define('storage', function (require) {
  'use strict';

  var isString = require('mu.is.string'),
      firebase = require('storage.firebase');

  var node = function (node) {
    return isString(node) ? firebase.child(node) : node;
  };

  var filter = function (list, attr, fn) {
    list = node(list);

    return function (value) {
      fn();

      list.orderByChild(attr).equalTo(value)
      .once('child_added', function (snapshot) {
        var item = snapshot.val();
        item.id = snapshot.key();
        fn(item);
      });
    };
  };

  var insert = function (list, item) {
    list = node(list);
    list.push(item);
  };

  return {
  	filter: filter,
  	insert: insert
  };
});
