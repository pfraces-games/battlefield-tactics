define('app.squads', function (require) {
  'use strict';

  var reduce   = require('mu.list.reduce'),
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

  var filter = function (model, key, value, callback) {
    firebase.child(model)
    .orderByChild(key)
    .equalTo(value)
    .once('child_added', function (snapshot) {
      var item = snapshot.val(),
          index = snapshot.key();

      callback(item, index);
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

    var updateView = function (squad) {
      dom('#squads-new-value').val(squad.value());
    };

    var addRow = function (template, list) {
      var row = template(),
          item = {};

      list.push(item);

      var updateItem = function (newItem) {
        var index = list.indexOf(item);
        list[index] = item = newItem;
      };

      var removeItem = function () {
        var index = list.indexOf(item);
        list.splice(index, 1);
      };

      dom(row).on('input', function () {
        var value = dom('.squads-new-soldier-name', this).val;
        updateItem({});
        updateView(squad);

        filter('soldiers', 'name', value(), function (soldier, index) {
          item.id = index;
          item.name = soldier.name; 
          item.value = soldier.value;

          updateView(squad);
        });
      });
      
      dom('.squads-new-remove-soldier', row).on('click', function () {
        dom(row).remove();
        removeItem();
        updateView(squad);
      });
    };

    var soldierTpl = tpl('.squads-new-soldier').repeater();
    addRow(soldierTpl, squad.soldiers);
    updateView(squad);

    dom('#squads-new-name').on('input', function () {
      squad.name = dom(this).val();
    });

    dom('#squads-new-add-soldier').on('click', function (event) {
      event.preventDefault(); // prevent firing submit event
      addRow(soldierTpl, squad.soldiers);
    });

    dom('#squads-new-submit').on('submit', function (event) {
      event.preventDefault();

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
