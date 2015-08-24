define('app.weapons.detail', function (require) {
  'use strict';

  var partial   = require('mu.fn.partial'),
      model     = require('model'),
      storage   = require('storage'),
      tab       = require('ui.tab');

  var dom       = require('domo').use({
    addClass    : require('domo.addClass'),
    removeClass : require('domo.removeClass'),
    val         : require('domo.val'),
    html        : require('domo.html'),
    onClick     : require('domo.on.click'),
    onInput     : require('domo.on.input'),
    onSubmit    : require('domo.on.submit')
  });

  var view = model({
    weaponId: ''
  });

  var weapon = model({
    name: '',
    value: 0,
    damage: 0
  });

  var tabName = function (name) {
    dom('#tab-weapons-detail')
    .html(name ? name : 'new weapon');
  };

  var init = function () {
    dom('#weapons-detail-name').onInput(weapon.name);
    weapon.on('name', dom('#weapons-detail-name').val);
    weapon.on('name', tabName);

    dom('#weapons-detail-value').onInput(weapon.value);
    weapon.on('value', dom('#weapons-detail-value').val);

    dom('#weapons-detail-damage').onInput(weapon.damage);
    weapon.on('damage', dom('#weapons-detail-damage').val);

    dom('#weapons-detail-submit')
    .onSubmit(storage.insert('weapons', weapon.snapshot))
    .onSubmit(partial(tab.active, 'weapons', 'weapons-master'));

    dom('#weapons-detail-delete')
    .onClick(storage.remove('weapons', view.weaponId))
    .onClick(partial(tab.active, 'weapons', 'weapons-master'));

    view.on('weaponId', function (id) {
      if (id) { dom('#weapons-detail-delete').removeClass('hidden'); }
      else { dom('#weapons-detail-delete').addClass('hidden'); }
    });
  };

  var load = function (weaponId) {
    storage.filter('weapons', 'id', function (item) {
      view.weaponId(item ? item.id : '');
      weapon.update(item);
      tab.active('weapons', 'weapons-detail');
    })(weaponId);
  };

  return {
    init: init,
    load: load
  };
});