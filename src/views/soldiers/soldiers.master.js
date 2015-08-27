define('app.soldiers.master', function (require) {
  'use strict';

  var partial = require('mu.fn.partial'),
      model   = require('model'),
      storage = require('storage'),
      user    = require('storage.user'),
      detail  = require('app.soldiers.detail');

  var dom     = require('domo').use({
    html      : require('domo.html'),
    remove    : require('domo.remove'),
    repeater  : require('domo.repeater'),
    onClick   : require('domo.on.click')
  });

  var soldierModel = partial(model, {
    id: '',
    name: '',
    value: 0,
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

  var init = function () {
    var $soldier = dom('.soldiers-master-item').repeater();

    storage.each(user.soldiers, function (item, onRemove, onUpdate) {
      var soldier = soldierModel(),
          $node = $soldier();

      soldier.update(item);
      onRemove(dom($node).remove);
      onUpdate(soldier.update);

      soldier.on('name', dom('.soldiers-master-item-name', $node).html);
      soldier.on('value', dom('.soldiers-master-item-value', $node).html);
      soldier.character.on('name', dom('.soldiers-master-item-character', $node).html);
      soldier.weapon.on('name', dom('.soldiers-master-item-weapon', $node).html);

      dom($node).onClick(partial(detail.load, soldier.id()));
    });

    dom('#soldiers-master-create').onClick(detail.load);
  };

  return {
    init: init
  };
});