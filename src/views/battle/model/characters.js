define('app.battle.model.characters', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      apply     = require('mu.fn.apply'),
      partial   = require('mu.fn.partial'),
      each      = require('mu.list.each'),
      remove    = require('mu.list.remove'),
      uid       = require('uid'),
      cells     = require('app.battle.model.cells');

  var id = uid(),
      characters = [],
      currentCharacter = false;

  var model = function (update) {
    if (update) {
      characters = update;
      cells.each(function (cell) { delete cell.character; });
      each(characters, function (chr) { cells.at(chr.pos).character = chr; });

      if (currentCharacter) {
        currentCharacter = each(characters, function (item) {
          if (item.id === currentCharacter.id) { return item; }
        });
      }
    }

    return characters;
  };

  var add = function (character) {
    character.id = id();
    characters[characters.length] = character;
    cells.at(character.pos).character = character;
  };


  var current = function (character) {
    if (isDefined(character)) { currentCharacter = character; }
    return currentCharacter;
  };

  var characterRemove = function () {
    return apply(partial(remove, characters), arguments);
  };

  var characterEach = function () {
    return apply(partial(each, characters), arguments);
  };

  return {
    model: model,
    add: add,
    current: current,
    remove: characterRemove,
    each: characterEach
  };
});
