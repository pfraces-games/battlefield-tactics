define('app.squads.create', function (require) {
  'use strict';

  var reduce  = require('mu.list.reduce'),
      model   = require('model'),
      storage = require('storage'),
      user    = require('storage.user');

  var dom    = require('domo').use({
    onInput  : require('domo.on.input'),
    onClick  : require('domo.on.click'),
    onSubmit : require('domo.on.submit'),
    val      : require('domo.val'),
    remove   : require('domo.remove'),
    repeater : require('domo.repeater')
  });

  var init = function () {
    var squad = model({
      name: '',
      value: function (squad) {
        return reduce(squad.soldiers.snapshot(), 0, function (acc, item) {
          return acc + item.value;
        });
      },
      soldiers: [{
        id: '',
        name: '',
        value: 0
      }]
    });

    dom('#squads-new-name').onInput(squad.name);

    squad.soldiers.on('event', function () {
      dom('#squads-new-value').val(squad.value());
    });

    dom('#squads-new-add-soldier').onClick(squad.soldiers.insert);

    var $soldier = dom('.squads-new-soldier').repeater();
    
    squad.soldiers.on('insert', function (soldier, removeSoldier) {
      var $node = $soldier();

      dom('.squads-new-soldier-name', $node)
      .onInput(storage.filter(user.soldiers, 'name', soldier.update));

      dom('.squads-new-remove-soldier', $node).onClick(function () {
        removeSoldier();
        dom($node).remove();
      });
    });

    dom('#squads-new-submit')
    .onSubmit(storage.insert(user.squads, squad.snapshot));

    squad.soldiers.insert();
  };

  return {
    init: init
  };
});
