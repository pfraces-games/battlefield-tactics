define('app.login', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      login  = require('app.login.login'),
      signup  = require('app.login.signup');

  var init = function () {
    tab.group('login');
    
    login.init();
    signup.init();
  };

  return {
    init: init
  };
});
