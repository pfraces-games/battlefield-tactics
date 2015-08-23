define('storage.user', function (require) {
	'use strict';

  var firebase = require('storage.firebase'),
      session  = require('storage.session');

  var user = null;

  session.onLogin(function (auth) {
    user = firebase.child('users').child(auth.uid);
  });

  var profile = function () {
    return user.child('profile');
  };

  var soldiers = function () {
    return user.child('soldiers');
  };

  var squads = function () {
    return user.child('squads');
  };

  return {
    profile: profile,
    soldiers: soldiers,
    squads: squads
  };
});