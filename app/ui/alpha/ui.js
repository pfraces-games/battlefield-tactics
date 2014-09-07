define('app.ui', function (require) {
  'use strict';

  var domo            = require('domo'),
      domoOn          = require('domo.on'),
      domoAddClass    = require('domo.addClass'),
      domoRemoveClass = require('domo.removeClass'),
      model           = require('app.model'),
      render          = require('app.ui.render'),
      uiCell          = require('app.ui.cell'),
      straightLine    = require('straightLine'),
      log             = require('log');

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

  var rotate = function (cell, path) {
    var start = path[0],
        next = path[1];

    var north = start.y > next.y,
        south = start.y < next.y,
        east = start.x < next.x,
        west = start.x > next.x;

    var dir = '';

    if (north) { dir += 'N'; }
    if (south) { dir += 'S'; }
    if (east) { dir += 'E'; }
    if (west) { dir += 'W'; }

    cell.character.direction = dir;
  };

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
        rotate(current.cell, path);
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
