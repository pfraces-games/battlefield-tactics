define('app.ui.render', function (require) {
  'use strict';

  var domo           = require('domo'),
      turn           = require('app.model.turn'),
      cells          = require('app.model.cells'),
      characters     = require('app.model.characters'),
      uiCell         = require('app.ui.cell'),
      tplCell        = require('app.ui.template.cell'),
      tplCharacter   = require('app.ui.template.character');

  var dom = domo.use({
    empty:       require('domo.empty'),
    append:      require('domo.append'),
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    html:        require('domo.html')
  });

  var TERRAIN = {
    'G': 'grass',
    'L': 'lake',
    'W': 'wall'
  };

  var renderMap = function () {
    var canvas = dom('#canvas');

    cells.each(function (cell) {
      var terrain = TERRAIN[cell.terrain];
      canvas.append(tplCell(uiCell.id(), terrain));
    });
  };

  var renderWidgets = function () {
    dom('#turn').html(tplCharacter(turn.current(), 'south'));
  };

  var renderCharacters = function () {
    dom('#canvas .terrain').empty();

    characters.each(function (character) {
      dom('#' + uiCell.posId(character.pos) + ' > .terrain')
      .append(tplCharacter(character.team, character.direction));
    });
  };

  var renderActiveCharacter = function () {
    dom('#canvas .selected').removeClass('selected');

    if (characters.current()) {
      dom('#' + uiCell.posId(characters.current().pos) + ' > .selector')
      .addClass('selected');
    }
  };

  return {
    map: renderMap,
    widgets: renderWidgets,
    characters: renderCharacters,
    activeCharacter: renderActiveCharacter
  };
});