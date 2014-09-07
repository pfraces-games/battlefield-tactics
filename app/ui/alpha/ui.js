define('app.ui', function (require) {
  'use strict';

  var domo            = require('domo'),
      domoOn          = require('domo.on'),
      domoAddClass    = require('domo.addClass'),
      domoRemoveClass = require('domo.removeClass'),
      straightLine    = require('straightLine'),
      log             = require('log'),
      model           = require('app.model'),
      render          = require('app.ui.render'),
      uiCell          = require('app.ui.cell'),
      direction       = require('app.path.direction');

  var dom = domo.use({
    on: domoOn,
    addClass: domoAddClass,
    removeClass: domoRemoveClass
  });

  var LEFT_BUTTON = 0,
      MIDDLE_BUTTON = 1,
      RIGHT_BUTTON = 2;

  var currentCharacter = (function () {
    var current;

    var setCurrent = function (node, pos, cell) {
      if (!cell.character) { return current; }

      current = {
        node: node,
        pos: pos,
        cell: cell
      };

      dom('.selected').removeClass('selected');
      dom('.selector', node).addClass('selected');

      log(cell.character);
      return current;
    };

    var getCurrent = function () {
      return current;
    };

    return {
      set: setCurrent,
      get: getCurrent
    };
  })();

  var setListeners = function () {
    dom('#canvas').on('contextmenu', function (event) {
      event.preventDefault();
    });

    dom('.cell').on('mouseup', function (event) {
      var btn = event.button,
          isLeftBtn = btn === LEFT_BUTTON,
          isMiddleBtn = btn === MIDDLE_BUTTON,
          isRightBtn = btn === RIGHT_BUTTON;

      var selectorNode = event.target,
          cellNode = selectorNode.parentNode,
          pos = uiCell.pos(cellNode.id),
          cell = model.at(pos.x, pos.y);

      var current = currentCharacter.get();
      if (isLeftBtn) { current = currentCharacter.set(cellNode, pos, cell); }
      if (!current || current.pos === pos) { return; }

      var path = straightLine(current.pos, pos);

      if (isLeftBtn && cell.terrain === 'G') {
        cell.character = current.cell.character;
        delete current.cell.character;
        render.characters();
        currentCharacter.set(cellNode, pos, cell);
        return;
      }

      if (isRightBtn) {
        current.cell.character.direction = direction(path);
        render.characters();
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
