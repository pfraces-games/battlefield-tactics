define('app.weapons.master', function (require) {
  'use strict';

  var partial  = require('mu.fn.partial'),
      storage  = require('storage'),
      detail   = require('app.weapons.detail');

  var dom      = require('domo').use({
      html     : require('domo.html'),
      remove   : require('domo.remove'),
  	  repeater : require('domo.repeater'),
      onClick  : require('domo.on.click')
  });

  var init = function () {
  	var $weapon = dom('.weapons-master-item').repeater();

  	storage.each('weapons', function (weapon, onRemove) {
      var $node = $weapon();

  		dom('.weapons-master-item-name', $node).html(weapon.name);
  		dom('.weapons-master-item-value', $node).html(weapon.value);
      dom('.weapons-master-item-damage', $node).html(weapon.damage);
      
      dom($node).onClick(partial(detail.load, weapon.id));
      onRemove(dom($node).remove);
  	});

    dom('#weapons-master-create').onClick(detail.load);
  };

  return {
  	init: init
  };
});
