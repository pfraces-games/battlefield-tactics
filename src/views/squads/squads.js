define('app.squads', function (require) {
  'use strict';

  var partial  = require('mu.fn.partial'),
      reduce   = require('mu.list.reduce'),
      tab      = require('ui.tab'),
      firebase = require('firebase');

  var dom      = require('domo').use({
    on:          require('domo.on'),
    val:         require('domo.val'),
    remove:      require('domo.remove')
  });

  var tpl      = require('domo').use({
    repeater:    require('domo.repeater')
   });

  var int = function (arg) {
    return parseInt(arg, 10) || 0;
  };

  var query = function (model, key, value, callback) {
    firebase.child(model)
    .orderByChild(key)
    .equalTo(value)
    .once('child_added', function (snapshot) {
      var item = snapshot.val(),
          index = snapshot.key();

      callback(item, index);
    });
  };

  var soldierByName = function (name, callback) {
    query('soldiers', 'name', name, function (item, index) {
      callback({
        id: index,
        name: item.name,
        value: item.value
      });
    });
  };

  var init = function () {
    tab.group('squads');

    var squad = {
      name: '',
      value: function () {
        return reduce(squad.soldiers, 0, function (acc, item) {
          return acc + int(item.value);
        });
      },
      soldiers: [/* {
        id: '',
        name: '',
        value: 0
      } */]
    };

    var updateView = function () {
      dom('#squads-new-value').val(squad.value());
    };

    var addItem = function (template, list) {
      var node = template(),
          item = {};

      list.push(item);
      updateView();

      var updateItem = function (newItem) {
        var index = list.indexOf(item);
        item = newItem || {};
        list[index] = item;
        updateView();
      };

      var removeItem = function () {
        var index = list.indexOf(item);
        list.splice(index, 1);
        dom(node).remove();
        updateView();
      };

      dom('.squads-new-soldier-name', node).on('input', function () {
        updateItem();
        soldierByName(dom(this).val(), updateItem);
      });

      dom('.squads-new-remove-soldier', node).on('click', removeItem);
    };

    var soldierTpl = tpl('.squads-new-soldier').repeater(),
        addSoldier = partial(addItem, soldierTpl, squad.soldiers);

    addSoldier();

    dom('#squads-new-name').on('input', function () {
      squad.name = dom(this).val();
    });

    dom('#squads-new-add-soldier').on('click', function (event) {
      event.preventDefault(); // prevent firing submit event
      addSoldier();
    });

    dom('#squads-new-submit').on('submit', function (event) {
      event.preventDefault(); // prevent firing submit event

      firebase.child('squads').push({
        name: squad.name,
        value: squad.value(),
        soldiers: squad.soldiers
      });
    });
  };

  return {
    init: init
  };
});
