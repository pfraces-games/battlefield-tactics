  define('app.soldiers.detail', function (require) {
  'use strict';

  var partial = require('mu.fn.partial'),
      model   = require('model'),
      storage = require('storage'),
      user    = require('storage.user'),
      tab     = require('ui.tab');

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
    soldierId: ''
  });

  var soldier = model({
    name: '',
    value: function (soldier) {
      return soldier.character.value() + soldier.weapon.value(); 
    },
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

  var tabName = function (name) {
    dom('#tab-soldiers-detail')
    .html(name ? name : 'new soldier');
  };

  var init = function () {
    dom('#soldiers-detail-name').onInput(soldier.name);
    soldier.on('name', dom('#soldiers-detail-name').val);
    soldier.on('name', tabName);

    soldier.on('event', function () {
      dom('#soldiers-detail-value').val(soldier.value());
    });

    dom('#soldiers-detail-character')
    .onInput(soldier.character.reset)
    .onInput(storage.filter('characters', 'name', soldier.character.update));

    soldier.character.on('name', dom('#soldiers-detail-character').val);

    dom('#soldiers-detail-weapon')
    .onInput(soldier.weapon.reset)
    .onInput(storage.filter('weapons', 'name', soldier.weapon.update));

    soldier.weapon.on('name', dom('#soldiers-detail-weapon').val);

    dom('#soldiers-detail-submit')
    .onSubmit(storage.save(user.soldiers, view.soldierId, soldier.snapshot))
    .onSubmit(partial(tab.active, 'soldiers', 'soldiers-master'));

    dom('#soldiers-detail-delete')
    .onClick(storage.remove(user.soldiers, view.soldierId))
    .onClick(partial(tab.active, 'soldiers', 'soldiers-master'));

    view.on('soldierId', function (id) {
      if (id) { dom('#soldiers-detail-delete').removeClass('hidden'); }
      else { dom('#soldiers-detail-delete').addClass('hidden'); }
    });

    // initial redraw of soldier value
    soldier.emit('event');
  };

  var load = storage.filter(user.soldiers, 'id', function (item) {
    view.soldierId(item ? item.id : '');
    soldier.update(item);
    tab.active('soldiers', 'soldiers-detail');
  });

  return {
    init: init,
    load: load
  };
});
