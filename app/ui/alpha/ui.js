define('app.ui', function (require) {
  'use strict';

  var each         = require('mu.list.each'),
      domo         = require('domo'),
      log          = require('log'),
      actions      = require('app.actions'),
      team         = require('app.state.team'),
      character    = require('app.state.character'),
      render       = require('app.ui.render'),
      uiCell       = require('app.ui.cell'),
      tplCharacter = require('app.ui.template.character');

  var dom = domo.use({
    on:          require('domo.on'),
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    replaceWith: require('domo.replaceWith')
  });

  team.onChange(function (newTeam) {
    dom('#turn').replaceWith(tplCharacter(newTeam, 'south'));
  });

  character.onChange(function (newCharacter) {
    dom('.selected').removeClass('selected');

    if (newCharacter) {
      dom('#' + uiCell.posId(newCharacter.pos) + ' > .selector')
      .addClass('selected');
    }
  });

  var setListeners = function () {
    var BTN = {
      0: 'left',
      1: 'middle',
      2: 'right'
    };

    dom('#turn').on('click', function () {
      if (!team.get()) { return; }
      team.toggle();
      character.set();
    });

    dom('#canvas')
    .on('contextmenu', function (event) {
      event.preventDefault();
    })
    .on('mouseup', function (event) {
      var btn = BTN[event.button],
          pos = uiCell.idPos(event.target.parentNode.id);

      actions(btn, pos);
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
