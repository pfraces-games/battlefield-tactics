define('app.squads', function (require) {
  'use strict';

  var tab = require('ui.tab'),
      firebase = require('firebase');

  var dom      = require('domo').use({
    on:          require('domo.on'),
    val:         require('domo.val')
  });

  var init = function () {
    tab.group('squads');

    dom('#squads-new-submit').on('submit', function (event) {
      event.preventDefault();

      var squad = {
        name: dom('#squad-new-name').val(),
        value: dom('#squad-new-value').val()
      };

      firebase.child('squads').push(squad);
    });
  };

  return {
    init: init
  };
});
