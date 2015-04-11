define('app.squads', function (require) {
  'use strict';

  var reduce   = require('mu.list.reduce'),
      tab      = require('ui.tab'),
      firebase = require('firebase');

  var dom      = require('domo').use({
    on:          require('domo.on'),
    val:         require('domo.val'),
    index:       require('domo.index')
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
   
    var addSoldier = (function () {
      var dom = require('domo').use({
        append: require('domo.append'),
        clone:  require('domo.clone'),
        parent: require('domo.parent')
      });
   
      var node = dom('.squads-new-soldier'),
          parent = dom(node.parent()),
          tpl = dom(node.clone());
      
      var addSoldier = function () {
          var copy = tpl.clone();
          parent.append(copy);
          return copy;
      };
   
      return addSoldier;
    })();

    dom('#squads-new-name').on('input', function () {
      squad.name = dom(this).val();
    });

    /*
    
    <tr id="squads-new-soldiers">
      <td><input type="text" class="squads-new-soldier" /></td>
    </tr>
    
    */
    
    var onSoldierInput = function () {
      var index = dom(this).index(),
          value = dom('.squads-new-soldier-name', this).val,
          soldier = squad.soldiers[index] = {};

      updateView(squad);

      filter('soldiers', 'name', value(), function (item, index) {
        soldier.id = index;
        soldier.name = item.name; 
        soldier.value = item.value;

        updateView(squad);
      });
    };

    dom('.squads-new-soldier').on('input', onSoldierInput);

    dom('#squads-new-add-soldier').on('click', function (event) {
      event.preventDefault(); // prevent firing submit event

      var soldier = addSoldier(),
          index = squad.soldiers.push(null) - 1;

      dom(soldier).on('input', onSoldierInput);
      
      dom('.squads-new-remove-soldier', soldier).on('click', function () {
        soldier.parentNode.removeChild(soldier);
        squad.soldiers.splice(index, 1);
        updateView(squad);
      });
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
