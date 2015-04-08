define('app.logout', function (require) {
  'use strict';

  var firebase = require('firebase');

  var dom      = require('domo').use({
    on:          require('domo.on')
  });

  var init = function () {
    dom('#logout-submit').on('submit', function (event) {
      event.preventDefault();
      firebase.unauth();
    });
  };

  return {
    init: init
  };
});
