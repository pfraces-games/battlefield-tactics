define('app.characters', function (require) {
  'use strict';

  var tab     = require('ui.tab'),
      storage = require('storage');

  var dom = require('domo').use({
    on:     require('domo.on'),
    val:    require('domo.val')
  });

  var init = function () {
    tab.group('characters');

    dom('#characters-new-submit').on('submit', function (event) {
      event.preventDefault();

      var character = {
        name: dom('#characters-new-name').val(),
        value: dom('#characters-new-value').val(),
        actionPoints: dom('#characters-new-action-points').val(),
        health: dom('#characters-new-health').val(),
        accuracy: dom('#characters-new-accuracy').val()
      };

      storage.child('characters').push(character);
    });
  };

  return {
    init: init
  };
});
