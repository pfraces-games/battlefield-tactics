define('app.model.character', function (require) {
  'use strict';

  var partial  = require('mu.fn.partial'),
      each     = require('mu.list.each'),
      remove   = require('mu.list.remove'),
      mapModel = require('app.model.map');

  var characters = [];

  var add = function (character) {
    characters[characters.length] = character;
    mapModel.at(character.pos).character = character;
  };

  return {
    add: add,
    remove: partial(remove, characters),
    each: partial(each, characters)
  };
});
