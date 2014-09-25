define('app.ui', function (require) {
  'use strict';

  var each         = require('mu.list.each'),
      domo         = require('domo'),
      log          = require('log'),
      actions      = require('app.actions'),
      teams        = require('app.model.teams'),
      characters   = require('app.model.characters'),
      render       = require('app.ui.render'),
      uiCell       = require('app.ui.cell'),
      tplCharacter = require('app.ui.template.character');

  var dom = domo.use({
    on: require('domo.on')
  });

  var setListeners = function () {
    var BTN = {
      0: 'left',
      1: 'middle',
      2: 'right'
    };

    dom('#turn').on('click', function () {
      if (!teams.current()) { return; }
      teams.toggle();
      characters.current(false);

      render.panels();
      render.characters();
    });

    dom('#canvas')
    .on('contextmenu', function (event) {
      event.preventDefault();
    })
    .on('mouseup', function (event) {
      var btn = BTN[event.button],
          pos = uiCell.idPos(event.target.parentNode.id);

      actions(btn, pos);

      render.panels();
      render.characters();
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
