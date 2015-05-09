/**
 * TODO: real selectors
 * TODO: storage.soldiers.byName
 * TODO: storage.squads.create
 */

define('app.squads.create', function (require) {
  'use strict';

  var reduce   = require('mu.list.reduce'),
      model    = require('model'),
      storage  = require('app.storage');

  var dom      = require('domo').use({
    onInput    : require('domo.on.input'),
    onClick    : require('domo.on.click'),
    onSubmit   : require('domo.on.submit'),
    val        : require('domo.val'),
    remove     : require('domo.remove'),
    repeater   : require('domo.repeater')
   });

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

    dom('#name').onInput(squad.name);

    squad.soldiers.on('event', function () {
      dom('#value').val(squad.value());
    });

    var $soldier = dom('#soldiers').repeater();
    dom('#add').onClick(squad.soldiers.add);
    squad.soldiers.add();

    squad.soldiers.on('insert', function (soldier) {
      var node = soldier.value().node = $soldier();
      dom('.name', node).onInput(storage.soldiers.byName(soldier.update));
      dom('.remove', node).onClick(soldier.remove);
    });

    squad.soldiers.on('remove', function (soldier) {
      dom(soldier.node).remove();
    });

    dom('#submit').onSubmit(function () {
      storage.squads.create(squad());
    });
  };

  return {
    init: init
  };
});
