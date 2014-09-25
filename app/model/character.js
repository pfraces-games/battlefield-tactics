define('app.model.character', function (require) {
  'use strict';

  var partial  = require('mu.fn.partial'),
      each     = require('mu.list.each'),
      removeAt = require('mu.list.removeAt'),
      mapModel = require('app.model.map');

  var characters = [];

  var add = function (character) {
    var index = characters.length;
    character.index = index;
    characters[index] = character;
    mapModel.at(character.pos).character = character;
  };

  var at = function (index) {
    return characters[index];
  };

  return {
    add: add,
    at: at,
    remove: partial(removeAt, characters),
    each: partial(each, characters)
  };
});
