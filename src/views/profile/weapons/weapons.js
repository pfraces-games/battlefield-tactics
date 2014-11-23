define('app.weapons', function (require) {
  'use strict';

  var tab     = require('ui.tab'),
      storage = require('storage');

  var dom = require('domo').use({
    on:     require('domo.on'),
    val:    require('domo.val')
  });

  var init = function () {
    tab.group('weapons');

    dom('#weapons-new-submit').on('submit', function (event) {
      event.preventDefault();

      var weapon = {
        name: dom('#weapons-new-name').val(),
        value: dom('#weapons-new-value').val(),
        damage: dom('#weapons-new-damage').val()
      };

      storage.child('weapons').push(weapon);
    });
  };

  return {
    init: init
  };
});
