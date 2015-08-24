define('app.weapons.detail', function (require) {
  'use strict';

  var model   = require('model'),
      storage = require('storage');

  var dom    = require('domo').use({
    onInput  : require('domo.on.input'),
    onSubmit : require('domo.on.submit'),
    val      : require('domo.val')
  });

  var weapon = model({
    name: '',
    value: 0,
    damage: 0
  });

  var init = function () {
    dom('#weapons-detail-name').onInput(weapon.name);
    weapon.on('name', dom('#weapons-detail-name').val);

    dom('#weapons-detail-value').onInput(weapon.value);
    weapon.on('value', dom('#weapons-detail-value').val);

    dom('#weapons-detail-damage').onInput(weapon.damage);
    weapon.on('damage', dom('#weapons-detail-damage').val);

    dom('#weapons-detail-submit').onSubmit(function () {
      storage.insert('weapons', weapon.snapshot());
    });
  };

  var load = storage.filter('weapons', 'id', weapon.update);

  return {
    init: init,
    load: load
  };
});