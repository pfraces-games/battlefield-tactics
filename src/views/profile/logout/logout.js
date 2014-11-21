define('app.logout', function (require) {
  'use strict';

  var storage = require('storage');

  var dom = require('domo').use({
    on:     require('domo.on')
  });

  var init = function () {
    dom('#logout-submit').on('submit', function (event) {
      event.preventDefault();
      storage.unauth();
    });
  };

  return {
    init: init
  };
});
