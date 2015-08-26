define('app.weapons.master', function (require) {
  'use strict';

  var partial = require('mu.fn.partial'),
      model   = require('model'),
      storage = require('storage'),
      detail  = require('app.weapons.detail');

  var dom     = require('domo').use({
    html      : require('domo.html'),
    remove    : require('domo.remove'),
  	repeater  : require('domo.repeater'),
    onClick   : require('domo.on.click')
  });

  var weaponModel = partial(model, {
    id: '',
    name: '',
    value: 0,
    damage: 0
  });

  var init = function () {
  	var $weapon = dom('.weapons-master-item').repeater();

    storage.each('weapons', function (item, onRemove, onUpdate) {
      var weapon = weaponModel(),
          $node = $weapon();

      weapon.update(item);
      onRemove(dom($node).remove);
      onUpdate(weapon.update);

      weapon.on('name', dom('.weapons-master-item-name', $node).html);
      weapon.on('value', dom('.weapons-master-item-value', $node).html);
      weapon.on('damage', dom('.weapons-master-item-damage', $node).html);

      dom($node).onClick(partial(detail.load, weapon.id()));
    });
  };

  return {
  	init: init
  };
});