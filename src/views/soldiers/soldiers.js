define('app.soldiers', function (require) {
  'use strict';

  var tab = require('ui.tab'),
      firebase = require('firebase');

  var dom      = require('domo').use({
    on:          require('domo.on'),
    val:         require('domo.val')
  });

  var init = function () {
    tab.group('soldiers');

    var soldier = {
      name: '',
      value: function () {
        return soldier.character.value + soldier.weapon.value;
      },
      character: {
        id: '',
        name: '',
        value: 0
      },
      weapon: {
        id: '',
        name: '',
        value: 0
      }
    };

    var updateView = function () {
      dom('#soldiers-new-value').val(soldier.value());
    };

    dom('#soldiers-new-name').on('input', function () {
      soldier.name = dom(this).val();
      updateView();
    });

    dom('#soldiers-new-character').on('input', function () {
      soldier.character.name = dom(this).val();
      updateView();
    });

    dom('#soldiers-new-weapon').on('input', function () {
      soldier.weapon.name = dom(this).val();
      updateView();
    });

    dom('#soldiers-new-submit').on('submit', function (event) {
      event.preventDefault();

      firebase.child('soldiers').push({
        name: soldier.name,
        character: soldier.character,
        weapon: soldier.weapon
      });
    });
  };

  return {
    init: init
  };
});
