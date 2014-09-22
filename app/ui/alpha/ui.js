define('app.ui', function (require) {
  'use strict';

  var filter          = require('mu.list.filter'),
      straightLine    = require('straightLine'),
      log             = require('log'),
      model           = require('app.model'),
      render          = require('app.ui.render'),
      uiCell          = require('app.ui.cell'),
      tplCharacter    = require('app.ui.template.character'),
      direction       = require('app.path.direction'),
      pathCollisions  = require('app.path.collisions');

  var dom = require('domo').use({
    on:          require('domo.on'),
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    empty:       require('domo.empty'),
    append:      require('domo.append'),
  });

  var LEFT_BUTTON = 0,
      MIDDLE_BUTTON = 1,
      RIGHT_BUTTON = 2;

  var currentTeam = (function () {
    var current;

    var setCurrent = function (team) {
      dom('#turn')
      .empty()
      .append(tplCharacter(team, 'south'));

      return current = team;
    };

    var getCurrent = function () {
      return current;
    };

    var toggleCurrent = function () {
      if (current === 'red') { return setCurrent('blue'); }
      return setCurrent('red');
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
      dom('.selected').removeClass('selected');
      return current = null;
    };

    var setCurrent = function (pos, cell) {
      dom('.selected').removeClass('selected');
      dom('#' + uiCell.id(pos) + ' > .selector').addClass('selected');

      current = cell.character;
      current.pos = pos;
      current.cell = cell;
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

  var hit = function (activeCharacter, targetCharacter) {
    var WEAPON_DAMAGE = 4;
    
    var health = targetCharacter.health -= WEAPON_DAMAGE;
    if (health <= 0) { delete targetCharacter.cell.character; }
  };

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

      // Determine wether is middle button (scroll)

      if (isMiddleBtn) { return; } // TODO: return scroll( ... );

      // Get cell data

      var selectorNode = event.target,
          cellNode = selectorNode.parentNode,
          pos = uiCell.pos(cellNode.id),
          cell = model.at(pos.x, pos.y);

      var activeCharacter = currentCharacter.get(),
          activeTeam = currentTeam.get(),
          targetCharacter = cell.character;

      if (targetCharacter) {
        targetCharacter.cell = cell;
        targetCharacter.pos = pos;
      }

      if (!activeCharacter && !targetCharacter) { return; }

      // if no active character there is a target character:
      // ally selection with left or right button
      //
      // if no target character there is an active character and an
      // active team: movement or rotation
      //
      // if active character and target character there is an active team:
      // selection or shoot
      //
      // discard selection: requires target character and active team

      if (targetCharacter) {
        activeTeam = activeTeam || currentTeam.set(targetCharacter.team);

        if (isLeftBtn && activeTeam === targetCharacter.team) { 
          return currentCharacter.set(pos, targetCharacter.cell);
        }

        // there is a target character and is an enemy
        // rotate or shoot: require active character
        if (!activeCharacter) { return; }
      }

      // at this point there is an active team and active character
      // if target character it is enemy: rotate or shoot
      // if no target character: rotate or move
      // rotate, move or shoot: require path

      var path = straightLine(activeCharacter.pos, pos);

      // discard rotation

      if (isRightBtn) {
        activeCharacter.direction = direction(path[0], path[1]);
        return render.characters();
      }

      // shoot or move: require collision detection

      var collisions = pathCollisions(path);

      // discard shoot

      if (targetCharacter) {
        activeCharacter.direction = direction(path[0], path[1]);

        var bulletCollisions = filter(collisions, function (item) {
          return item.wall || item.character;
        });

        var collision = bulletCollisions[0];

        if (collision && collision.character) {

          // TODO hit to collision.character
          hit(activeCharacter, targetCharacter);
        }

        return render.characters();
      }

      // move

      var movementPath = path;

      if (collisions.length) {
        var movementCollision = collisions[0];

        movementPath = filter(path, function (item, index) {
          return index < movementCollision.index;
        });
      }

      if (movementPath.length < 2) { return; }

      var last = movementPath[movementPath.length - 1],
          lastButOne = movementPath[movementPath.length - 2];

      delete activeCharacter.cell.character;
      activeCharacter.cell = model.at(last.x, last.y);
      activeCharacter.pos = last;
      activeCharacter.direction = direction(lastButOne, last);
      activeCharacter.cell.character = activeCharacter;

      render.characters();
      currentCharacter.set(last, activeCharacter.cell);
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
