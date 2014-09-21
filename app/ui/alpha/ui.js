define('app.ui', function (require) {
  'use strict';

  var filter          = require('mu.list.filter'),
      domo            = require('domo'),
      domoOn          = require('domo.on'),
      domoAddClass    = require('domo.addClass'),
      domoRemoveClass = require('domo.removeClass'),
      domoEmpty       = require('domo.empty'),
      domoAppend      = require('domo.append'),
      straightLine    = require('straightLine'),
      log             = require('log'),
      model           = require('app.model'),
      render          = require('app.ui.render'),
      uiCell          = require('app.ui.cell'),
      tplCharacter    = require('app.ui.template.character'),
      direction       = require('app.path.direction'),
      pathCollision   = require('app.path.collision');

  var dom = domo.use({
    on: domoOn,
    addClass: domoAddClass,
    removeClass: domoRemoveClass,
    empty: domoEmpty,
    append: domoAppend
  });

  var LEFT_BUTTON = 0,
      MIDDLE_BUTTON = 1,
      RIGHT_BUTTON = 2;

  var currentTeam = (function () {
    var current;

    var setCurrent = function (team) {
      current = team;

      dom('#turn')
      .empty()
      .append(tplCharacter(team, 'south'));
    };

    var getCurrent = function () {
      return current;
    };

    var toggleCurrent = function () {
      if (current === 'red') { setCurrent('blue'); }
      else { setCurrent('red'); }
    };

    return {
      set: setCurrent,
      get: getCurrent,
      toggle: toggleCurrent
    };
  })();

  var currentCharacter = (function () {
    var current;

    var resetCurrent = function () {
      current = null;
      dom('.selected').removeClass('selected');
    };

    var setCurrent = function (pos, cell) {
      if (!cell.character) { return current; }

      current = {
        pos: pos,
        cell: cell
      };

      dom('.selected').removeClass('selected');
      dom('#' + uiCell.id(pos) + ' > .selector').addClass('selected');

      return current;
    };

    var getCurrent = function () {
      return current;
    };

    return {
      reset: resetCurrent,
      set: setCurrent,
      get: getCurrent
    };
  })();

  var setListeners = function () {
    dom('#turn').on('click', function () {
      if (!currentTeam.get()) { return; }

      currentTeam.toggle();
      currentCharacter.reset();
    });

    dom('#canvas')
    .on('contextmenu', function (event) {
      event.preventDefault();
    })
    .on('mouseup', function (event) {
      var btn = event.button,
          isLeftBtn = btn === LEFT_BUTTON,
          isMiddleBtn = btn === MIDDLE_BUTTON,
          isRightBtn = btn === RIGHT_BUTTON;

      var selectorNode = event.target,
          cellNode = selectorNode.parentNode,
          pos = uiCell.pos(cellNode.id),
          cell = model.at(pos.x, pos.y),
          current = currentCharacter.get(),
          activeTeam = currentTeam.get();

      if (!current && !cell.character) { return; }
      if (current && cell === current.cell) { return; }

      if (isLeftBtn) {
        // character selection

        if (!current && activeTeam && cell.character.team !== activeTeam) {
          return;
        }

        var newCharacter = currentCharacter.set(pos, cell);
        
        if (newCharacter !== current) {
          if (!activeTeam) {
            currentTeam.set(newCharacter.cell.character.team);
          }

          current = newCharacter;
          log(current.cell.character);
          return;
        }
      }

      var path = straightLine(current.pos, pos);

      if (isRightBtn) {
        // character rotation

        current.cell.character.direction = direction(path[0], path[1]);
        render.characters();
        return;
      }

      if (isLeftBtn) { 
        // character movement

        var collision = pathCollision(path);

        if (collision) {
          path = filter(path, function (item, index) {
            return index < collision.index;
          });
        }

        if (path.length < 2) { return; }

        var last = path[path.length - 1],
            lastButOne = path[path.length - 2],
            activeCharacter = current.cell.character;

        delete current.cell.character;
        cell = model.at(last.x, last.y)
        cell.character = activeCharacter;
        cell.character.direction = direction(lastButOne, last);

        render.characters();
        currentCharacter.set(last, cell);
        return;
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
