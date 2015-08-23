define('app.login.signup', function (require) {
  'use strict';

  var model    = require('model'),
      session  = require('storage.session');

  var dom      = require('domo').use({
    onInput    : require('domo.on.input'),
    onSubmit   : require('domo.on.submit')
  });

  var init = function () {
    var user = model({
      name: '',
      email: '',
      password: ''
    });

    dom('#login-signup-user').onInput(user.name);
    dom('#login-signup-email').onInput(user.email);
    dom('#login-signup-password').onInput(user.password);

    dom('#login-signup-submit').onSubmit(function () {
      session.signup(user.snapshot());
    });
  };

  return {
    init: init
  };
});