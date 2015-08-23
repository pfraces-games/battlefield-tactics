define('app.logout', function (require) {
  'use strict';

  var session = require('storage.session');

  var dom     = require('domo').use({
    onSubmit  : require('domo.on.submit')
  });

  var init = function () {
    dom('#logout-submit').onSubmit(session.logout);
  };

  return {
    init: init
  };
});
