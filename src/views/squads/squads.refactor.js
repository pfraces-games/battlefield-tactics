/**
 * TODO: do not save soldier DOM nodes
 * TODO: app.squads controller with tab.group
 * TODO: save numeric data as number
 */

define('app.squads.create', function (require) {
  'use strict';

  var reduce  = require('mu.list.reduce'),
      model   = require('model');

  var dom     = require('domo').use({
    onInput   : require('domo.on.input'),
    onClick   : require('domo.on.click'),
    onSubmit  : require('domo.on.submit'),
    val       : require('domo.val'),
    remove    : require('domo.remove'),
    repeater  : require('domo.repeater')
   });

  var storage = {
    squads    : require('app.storage.squads'),
    soldiers  : require('app.storage.soldiers')
  };

  var init = function () {
    var squad = model.object({
      name: '',
      value: function (squad) { return squad.soldiers.value(); },
      soldiers: model.array({
        add: function (soldiers, soldier) {
          soldiers.insert(soldier || {
            id: '',
            name: '',
            value: 0
          });
        },
        value: function (soldiers) {
          return reduce(soldiers(), 0, function (acc, item) {
            return acc + item.value();
          });
        }
      })
    });

    dom('#squads-new-name').onInput(squad.name);

    squad.soldiers.on('event', function () {
      dom('#squads-new-value').val(squad.value());
    });

    var $soldier = dom('.squads-new-soldier').repeater();
    dom('#squads-new-add-soldier').onClick(squad.soldiers.add);
    squad.soldiers.add();

    squad.soldiers.on('insert', function (soldier) {
      var node = soldier.value().node = $soldier();
      dom('.squads-new-soldier-name', node).onInput(storage.soldiers.byName(soldier.update));
      dom('.squads-new-remove-soldier', node).onClick(soldier.remove);
    });

    squad.soldiers.on('remove', function (soldier) {
      dom(soldier.node).remove();
    });

    dom('#squads-new-submit').onSubmit(function () {
      storage.squads.save(squad());
    });
  };

  return {
    init: init
  };
});
