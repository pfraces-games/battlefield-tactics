define('app.login.login', function (require) {
  'use strict';

  var model   = require('model'),
  	  session = require('storage.session');

  var dom     = require('domo').use({
    onInput   : require('domo.on.input'),
    onSubmit  : require('domo.on.submit')
  });

  var init = function () {
    var user = model({
      email: '',
      password: ''
    });

    dom('#login-login-email').onInput(user.email);
    dom('#login-login-password').onInput(user.password);

    dom('#login-login-submit').onSubmit(function () {
      session.login(user.snapshot());
    });
  };

  return {
    init: init
  };
});