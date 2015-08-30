define('app.squads.master', function (require) {
  'use strict';

  var partial = require('mu.fn.partial'),
      model   = require('model'),
      storage = require('storage'),
      user    = require('storage.user'),
      detail  = require('app.squads.detail');

  var dom     = require('domo').use({
    html      : require('domo.html'),
    remove    : require('domo.remove'),
    repeater  : require('domo.repeater'),
    onClick   : require('domo.on.click')
  });

  var squadModel = partial(model, {
    id: '',
    name: '',
    value: 0,
    soldiers: [{
      id: '',
      name: '',
      value: 0
    }]
  });

  var init = function () {
    var $squad = dom('.squads-master-item').repeater();

    storage.each(user.squads, function (item, onRemove, onUpdate) {
      var squad = squadModel(),
          $node = $squad();

      squad.update(item);
      onRemove(dom($node).remove);
      onUpdate(squad.update);

      squad.on('name', dom('.squads-master-item-name', $node).html);
      squad.on('value', dom('.squads-master-item-value', $node).html);
      
      squad.on('soldiers', function () {
        dom('.squads-master-item-soldiers', $node)
        .html(squad.soldiers.snapshot().length);
      });

      dom($node).onClick(partial(detail.load, squad.id()));
    });

    dom('#squads-master-create').onClick(detail.load);
  };

  return {
    init: init
  };
});