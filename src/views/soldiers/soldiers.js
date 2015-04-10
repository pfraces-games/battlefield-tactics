define('app.soldiers', function (require) {
  'use strict';

  var tab = require('ui.tab'),
      firebase = require('firebase');

  var dom      = require('domo').use({
    on:          require('domo.on'),
    val:         require('domo.val')
  });

  var filter = function (model, key, value, callback) {
    firebase.child(model)
    .orderByChild(key)
    .equalTo(value)
    .once('child_added', function (snapshot) {
      var item = snapshot.val(),
          index = snapshot.key();

      callback(item, index);
    });
  };

  var init = function () {
    tab.group('soldiers');

    var soldier = {
      name: '',
      value: function () {
        var computed = (
            (parseInt(soldier.character.value, 10) || 0) +
            (parseInt(soldier.weapon.value, 10) || 0)
        );

        return computed;
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
      soldier.character = {};
      updateView();

      filter('characters', 'name', dom(this).val(), function (item, index) {
        soldier.character.id = index;
        soldier.character.name = item.name; 
        soldier.character.value = item.value;

        updateView();
      });
    });

    dom('#soldiers-new-weapon').on('input', function () {
      soldier.weapon = {};
      updateView();

      filter('weapons', 'name', dom(this).val(), function (item, index) {
        soldier.weapon.id = index;
        soldier.weapon.name = item.name; 
        soldier.weapon.value = item.value;

        updateView();
      });
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
