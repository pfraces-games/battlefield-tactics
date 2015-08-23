define('storage', function (require) {
  'use strict';

  var firebase = require('storage.firebase');

  var filter = function (listName, attr, fn) {
    var list = firebase.child(listName);

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

  var insert = function (listName, item) {
    firebase.child(listName).push(item);
  };

  return {
  	filter: filter,
  	insert: insert
  };
});
