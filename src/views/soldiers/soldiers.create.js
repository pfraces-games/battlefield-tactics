define('app.soldiers.create', function (require) {
  'use strict';

  var model   = require('model'),
      storage = require('storage'),
      user    = require('storage.user');

  var dom     = require('domo').use({
    onInput   : require('domo.on.input'),
    onSubmit  : require('domo.on.submit'),
    val       : require('domo.val')
  });

  var init = function () {
    var soldier = model({
      name: '',
      value: function (soldier) {
        return soldier.character.value() + soldier.weapon.value(); 
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
    });

    dom('#soldiers-new-name').onInput(soldier.name);

    soldier.on('event', function () {
      dom('#soldiers-new-value').val(soldier.value());
    });

    dom('#soldiers-new-character')
    .onInput(storage.filter('characters', 'name', soldier.character.update));

    dom('#soldiers-new-weapon')
    .onInput(storage.filter('weapons', 'name', soldier.weapon.update));

    dom('#soldiers-new-submit').onSubmit(function () {
      user.insert('soldiers', soldier.snapshot()); 
    });
  };

  return {
    init: init
  };
});
