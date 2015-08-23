define('storage.session', function (require) {
	'use strict';

  var firebase = require('storage.firebase');

  var login = function (user, fn) {
    firebase.authWithPassword(user, fn);
  };

  var logout = function () {
    firebase.unauth();
  };

	var signup = function (user) {
    firebase.createUser(user, function (err) {
      if (err) { throw err; }

      login(user, function (err, auth) {
        if (err) { throw err; }

        firebase.child('users').child(auth.uid).child('profile')
        .set({
          name: user.name,
          email: auth.password.email
        });
      });
    });
	};

  var onLogin = function (fn) {
    firebase.onAuth(function (auth) {
      if (!auth) { return; }
      fn(auth);
    });
  };

  var onLogout = function (fn) {
    firebase.onAuth(function (auth) {
      if (auth) { return; }
      fn();
    });
  };

	return {
    login: login,
    logout: logout,
    signup: signup,
    onLogin: onLogin,
    onLogout: onLogout
	};
});