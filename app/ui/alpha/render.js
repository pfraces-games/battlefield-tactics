define('app.ui.render', function (require) {
  'use strict';

  var domo         = require('domo'),
      domoEmpty    = require('domo.empty'),
      domoAppend   = require('domo.append'),
      domoCss      = require('domo.css'),
      model        = require('app.model'),
      uiCell       = require('app.ui.cell'),
      tplCell      = require('app.ui.template.cell'),
      tplCharacter = require('app.ui.template.character');

  var dom = domo.use({
    empty: domoEmpty,
    append: domoAppend,
    css: domoCss
  });

  var TERRAIN = {
    'G': 'grass',
    'L': 'lake',
    'W': 'wall'
  };

  var DIRECTION = {
    'N': 'north',
    'NE': 'northeast',
    'E': 'east',
    'SE': 'southeast',
    'S': 'south',
    'SW': 'southwest',
    'W': 'west',
    'NW': 'northwest'
  };

  var renderMap = function () {
    var canvas = dom('#canvas');

    model.each(function (cell) {
      var terrain = TERRAIN[cell.terrain];
      canvas.append(tplCell(uiCell.newId(), terrain));
    });
  };

  var renderCharacters = function () {
    dom('.terrain').empty();

    model.each(function (cell, x, y) {
      if (cell.character) {
        var cellId = uiCell.id({ x: x, y: y }),
            terrain = dom('#' + cellId + ' > .terrain'),
            team = cell.character.team,
            direction = DIRECTION[cell.character.direction];

        terrain.append(tplCharacter(team, direction));
      }
    });
  };

  return {
    map: renderMap,
    characters: renderCharacters
  };
});
