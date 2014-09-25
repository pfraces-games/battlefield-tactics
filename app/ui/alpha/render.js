define('app.ui.render', function (require) {
  'use strict';

  var domo           = require('domo'),
      domoEmpty      = require('domo.empty'),
      domoAppend     = require('domo.append'),
      mapModel       = require('app.model.map'),
      characterModel = require('app.model.character'),
      uiCell         = require('app.ui.cell'),
      tplCell        = require('app.ui.template.cell'),
      tplCharacter   = require('app.ui.template.character');

  var dom = domo.use({
    empty: domoEmpty,
    append: domoAppend
  });

  var TERRAIN = {
    'G': 'grass',
    'L': 'lake',
    'W': 'wall'
  };

  var renderMap = function () {
    var canvas = dom('#canvas');

    mapModel.each(function (cell) {
      var terrain = TERRAIN[cell.terrain];
      canvas.append(tplCell(uiCell.newId(), terrain));
    });
  };

  var renderCharacters = function () {
    dom('.terrain').empty();

    characterModel.each(function (character) {
      dom('#' + uiCell.id(character.pos) + ' > .terrain')
      .append(tplCharacter(character.team, character.direction));
    });
  };

  return {
    map: renderMap,
    characters: renderCharacters
  };
});
