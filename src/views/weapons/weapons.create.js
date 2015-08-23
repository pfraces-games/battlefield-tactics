define('app.weapons.create', function (require) {
  'use strict';

  var model   = require('model'),
      storage = require('storage');

  var dom    = require('domo').use({
    onInput  : require('domo.on.input'),
    onSubmit : require('domo.on.submit')
  });

  var init = function () {
    var weapon = model({
      name: '',
      value: 0,
      damage: 0
    });

    dom('#weapons-new-name').onInput(weapon.name);
    dom('#weapons-new-value').onInput(weapon.value);
    dom('#weapons-new-damage').onInput(weapon.damage);

    dom('#weapons-new-submit').onSubmit(function () {
      storage.insert('weapons', weapon.snapshot());
    });
  };

  return {
    init: init
  };
});