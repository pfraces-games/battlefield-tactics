define('app.model.characters', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined'),
      partial   = require('mu.fn.partial'),
      each      = require('mu.list.each'),
      remove    = require('mu.list.remove'),
      cells     = require('app.model.cells');

  var characters = [],
      currentCharacter = false;

  var add = function (character) {
    characters[characters.length] = character;
    cells.at(character.pos).character = character;
  };


  var current = function (character) {
    if (isDefined(character)) { currentCharacter = character; }
    return currentCharacter;
  };

  return {
    add: add,
    current: current,
    remove: partial(remove, characters),
    each: partial(each, characters)
  };
});
