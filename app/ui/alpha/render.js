define('app.ui.render', function (require) {
  'use strict';

  var domo       = require('domo'),
      domoNative = require('domo.native'),
      domoAppend = require('domo.append'),
      domoCss    = require('domo.css'),
      model      = require('app.model'),
      uiCell     = require('app.ui.cell');

  var dom = domo.use({
    native: domoNative,
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

  var cellHtml = function (cellId, terrain) {
    return '' + 
      '<div id="' + cellId + '" class="cell">' +
        '<div class="terrain ' + terrain + '"></div>' +
        '<div class="selector"></div>' +
      '</div>';
  };
 
  var characterHtml = function (team, direction) {
    return '' +
      '<div class="character ' + team + ' ' + direction + '">' +
        '<div class="circle"></div>' +
        '<div class="line"></div>' +
        '<div class="arrow"></div>' +
      '</div>';
  };

  var renderMap = function () {
    var canvas = dom('#canvas');

    canvas.native(function (node) {
      node.innerHTML = '';
    });

    model.each(function (cell) {
      var terrain = TERRAIN[cell.terrain];
      canvas.append(cellHtml(uiCell.newId(), terrain));
    });
  };

  var renderCharacters = function () {
    dom('.terrain').native(function (node) {
      node.innerHTML = '';
    });

    model.each(function (cell, x, y) {
      if (cell.character) {
        var terrain = dom('#' + uiCell.id(x, y) + '> .terrain'),
            team = cell.character.team,
            direction = DIRECTION[cell.character.direction];

        terrain.append(characterHtml(team, direction));
      }
    });
  };

  return {
    map: renderMap,
    characters: renderCharacters
  };
});
