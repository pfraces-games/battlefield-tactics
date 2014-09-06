define('app.ui', function (require) {
  'use strict';

  var domo            = require('domo'),
      domoOn          = require('domo.on'),
      domoAddClass    = require('domo.addClass'),
      domoRemoveClass = require('domo.removeClass'),
      model           = require('app.model'),
      render          = require('app.ui.render'),
      uiCell          = require('app.ui.cell');

  var dom = domo.use({
    on: domoOn,
    addClass: domoAddClass,
    removeClass: domoRemoveClass
  });

  var log = function (character) {
    console.log(JSON.stringify(character));
  };

  var setListeners = function () {
    var current;

    var setCurrent = function (cell, node) {
      current = cell;
      dom('.selected').removeClass('selected');
      dom(node).addClass('selected');
    };

    dom('.cell').on('click', function (event) {
      var selectorNode = event.target,
          cellNode = selectorNode.parentNode,
          pos = uiCell.pos(cellNode.id),
          cell = model.at(pos.x, pos.y);

      if (cell.character) {
        log(cell.character);
        setCurrent(cell, selectorNode);
      } else if (current && cell.terrain === 'G') {
        cell.character = current.character;
        delete current.character;
        render.characters();
        setCurrent(cell, selectorNode);
      }
    });
  };

  var init = function () {
    render.map();
    render.characters();
    setListeners();
  };

  return {
    init: init
  };
});
