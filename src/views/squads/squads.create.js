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
      value: function () { return squad.soldiers.value(); },
      soldiers: model.array({
        add: function (soldier) {
          squad.soldiers.insert(soldier || {
            id: '',
            name: '',
            value: 0
          });
        },
        value: function () {
          return reduce(squad.soldiers.snapshot(), 0, function (acc, item) {
            return acc + item.value;
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
      var node = $soldier();

      dom('.squads-new-soldier-name', node)
      .onInput(storage.soldiers.byName(soldier.update));

      dom('.squads-new-remove-soldier', node).onClick(function () {
        soldier.remove();
        dom(node).remove();
      });
    });

    dom('#squads-new-submit').onSubmit(function () {
      storage.squads.save(squad.snapshot());
    });
  };

  return {
    init: init
  };
});
