define('app.login', function (require) {
  'use strict';

  var storage = require('storage'),
      tab     = require('ui.tab');

  var dom =      require('domo').use({
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    on:          require('domo.on'),
    val:         require('domo.val')
  });

  var login = function (user) {
    console.log(user);

    tab.disable('login');
    tab.enable('profile');
    tab.enable('rooms');
    tab.enable('battle');

    tab.active('view', 'profile');
  };

  var init = function () {
    tab.group('login');

    dom('#login-login-submit').on('click', function () {
      var user = {
        email: dom('#login-login-email').val(),
        password: dom('#login-login-password').val()
      };

      storage.authWithPassword(user, function (err, auth) {
        if (err) { throw err; }
        login(auth);
      });
    });

    dom('#login-signup-submit').on('click', function () {
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
          login(profile);
        });
      });
    });
  };

  return {
    init: init
  };
});
