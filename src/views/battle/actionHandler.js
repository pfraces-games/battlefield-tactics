define('app.battle.actionHandler', function (require) {
  'use strict';

  var partial    = require('mu.fn.partial'),
      each       = require('mu.list.each'),
      cells      = require('battle.model.cells'),
      characters = require('battle.model.characters'),
      actions    = require('app.battle.actionList');

  var or = function (actions) {
    return each(actions, function (action) {
      return action();
    });
  };
  
  var actionHandler = function (btn, pos) {
    var currentCharacter = characters.current(),
        node = cells.at(pos);

    if (btn === 'left') {
      return or([
        partial(actions.select, node.character),
        partial(actions.shoot, currentCharacter, node.character),
        partial(actions.move, currentCharacter, node)
      ]);
    }

    if (btn === 'right') {
      return or([
        partial(actions.rotate, currentCharacter, node)
      ]);
    }

    if (btn === 'middle') {
      return or([
        partial(actions.scroll)
      ]);
    }
  };

  return actionHandler;
});
