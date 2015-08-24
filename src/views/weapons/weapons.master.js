define('app.weapons.master', function (require) {
  'use strict';

  var storage = require('storage'),
      tab     = require('ui.tab'),
      detail  = require('app.weapons.detail');

  var dom     = require('domo').use({
    html      : require('domo.html'),
  	repeater  : require('domo.repeater'),
    onClick   : require('domo.on.click')
  });

  var init = function () {
  	var $weapon = dom('.weapons-master-item').repeater();

  	storage.each('weapons', function (weapon) {
      var $node = $weapon();

  		dom('.weapons-master-item-name', $node).html(weapon.name);
  		dom('.weapons-master-item-value', $node).html(weapon.value);
      dom('.weapons-master-item-damage', $node).html(weapon.damage);
      
      dom($node).onClick(function () {
        tab.active('weapons', 'weapons-detail');
        detail.load(weapon.id);
      });
  	});
  };

  return {
  	init: init
  };
});