define('app.login', function (require) {
  'use strict';

  var storage = require('storage'),
      tab     = require('ui.tab');

  var dom =      require('domo').use({
    on:          require('domo.on'),
    val:         require('domo.val')
  });

  var init = function () {
    tab.group('login');

    dom('#login-login-submit').on('submit', function (event) {
      event.preventDefault();

      var user = {
        email: dom('#login-login-email').val(),
        password: dom('#login-login-password').val()
      };

      storage.authWithPassword(user, function (err) {
        if (err) { throw err; }
      });
    });

    dom('#login-signup-submit').on('submit', function (event) {
      event.preventDefault();

      var user = {
        name: dom('#login-signup-user').val(),
        email: dom('#login-signup-email').val(),
        password: dom('#login-signup-password').val()
      };

      storage.createUser(user, function (err) {
        if (err) { throw err; }

        // auto login

        storage.authWithPassword(user, function (err, auth) {
          if (err) { throw err; }

          var profile = {
            name: user.name,
            uid: auth.uid,
            email: auth.password.email
          };

          storage.child('users').child(profile.uid).set(profile);
        });
      });
    });
  };

  return {
    init: init
  };
});
