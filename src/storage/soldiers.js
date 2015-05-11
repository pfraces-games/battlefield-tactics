define('app.storage.soldiers', function (require) {
  'use strict';

  var firebase = require('firebase');

  var filter = function (list, key, value, fn) {
    list.orderByChild(key).equalTo(value)
    .once('child_added', function (snapshot) {
      var item = snapshot.val(),
          index = snapshot.key();

      fn(item, index);
    });
  };

  var soldiers = firebase.child('soldiers');

  var filterByName = function (fn) {
    return function (name) {
      filter(soldiers, 'name', name, function (item, index) {
        fn({
          id: index,
          name: item.name,
          value: item.value
        });
      });
    };
  };

  return {
    byName: filterByName
  };
});
