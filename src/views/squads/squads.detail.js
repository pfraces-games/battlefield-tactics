define('app.squads.detail', function (require) {
  'use strict';

  var partial   = require('mu.fn.partial'),
      reduce    = require('mu.list.reduce'),
      model     = require('model'),
      storage   = require('storage'),
      user      = require('storage.user'),
      tab       = require('ui.tab');

  var dom       = require('domo').use({
    addClass    : require('domo.addClass'),
    removeClass : require('domo.removeClass'),
    val         : require('domo.val'),
    html        : require('domo.html'),
    onClick     : require('domo.on.click'),
    onInput     : require('domo.on.input'),
    onSubmit    : require('domo.on.submit'),
    remove      : require('domo.remove'),
    repeater    : require('domo.repeater')
  });

  var view = model({
    squadId: ''
  });

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

  var tabName = function (name) {
    dom('#tab-squads-detail')
    .html(name ? name : 'new squad');
  };

  var init = function () {
    dom('#squads-detail-name').onInput(squad.name);
    squad.on('name', dom('#squads-detail-name').val);
    squad.on('name', tabName);

    squad.soldiers.on('event', function () {
      dom('#squads-detail-value').val(squad.value());
    });

    dom('#squads-detail-add-soldier').onClick(squad.soldiers.insert);

    var $soldier = dom('.squads-detail-soldier').repeater();
    
    squad.soldiers.on('insert', function (soldier, removeSoldier) {
      var $node = $soldier();
      soldier.$node = $node;

      dom('.squads-detail-soldier-name', $node)
      .onInput(soldier.reset)
      .onInput(storage.filter(user.soldiers, 'name', soldier.update))
      .val(soldier.name());

      soldier.on('name', dom('.squads-detail-soldier-name', $node).val);

      dom('.squads-detail-remove-soldier', $node)
      .onClick(removeSoldier);
    });

    squad.soldiers.on('remove', function (soldier) {
      dom(soldier.$node).remove();
    });

    dom('#squads-detail-submit')
    .onSubmit(storage.save(user.squads, view.squadId, squad.snapshot))
    .onSubmit(partial(tab.active, 'squads', 'squads-master'));

    dom('#squads-detail-delete')
    .onClick(storage.remove(user.squads, view.squadId))
    .onClick(partial(tab.active, 'squads', 'squads-master'));

    view.on('squadId', function (id) {
      if (id) { dom('#squads-detail-delete').removeClass('hidden'); }
      else { dom('#squads-detail-delete').addClass('hidden'); }
    });

    squad.soldiers.insert();
  };

  var load = storage.filter(user.squads, 'id', function (item) {
    view.squadId(item ? item.id : '');
    squad.update(item);
    tab.active('squads', 'squads-detail');
  });

  return {
    init: init,
    load: load
  };
});
