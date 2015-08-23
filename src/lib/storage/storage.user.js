define('storage.user', function (require) {
	'use strict';

  var firebase = require('storage.firebase'),
      session  = require('storage.session');

  var user = null;

  session.onLogin(function (auth) {
    user = firebase.child('users').child(auth.uid);
  });

  var insert = function (listName, item) {
    user.child(listName).push(item);
  };

  var filter = function (listName, attr, fn) {
    return function (value) {
      fn();

      user.child(listName).orderByChild(attr).equalTo(value)
      .once('child_added', function (snapshot) {
        var item = snapshot.val();
        item.id = snapshot.key();
        fn(item);
      });
    };
  };

  return {
    insert: insert,
    filter: filter
  };
});