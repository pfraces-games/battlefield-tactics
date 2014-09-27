define('app.ui', function (require) {
  'use strict';

  var domo          = require('domo'),
      actionHandler = require('app.mechanics.action.handler'),
      characters    = require('app.model.characters'),
      turn          = require('app.model.turn'),
      render        = require('app.ui.render'),
      uiCell        = require('app.ui.cell'),
      storage       = require('app.storage.firebase');

  var dom = domo.use({
    on: require('domo.on')
  });

  var syncCharacters = function () {
    storage.child('characters').set(characters.model());
  };

  var syncTurn = function () {
    storage.child('turn').set(turn.model());
  };

  var setStorageListeners = function () {
    storage.child('characters').on('value', function (snapshot) {
      characters.model(snapshot.val());
      render.characters();
      render.activeCharacter();
    });

    storage.child('turn').on('value', function (snapshot) {
      var newVal = snapshot.val();
      if (newVal !== turn.current()) { characters.current(false); }
      turn.model(newVal);
      render.widgets();
      render.activeCharacter();
    });
  };

  var setDomListeners = function () {
    dom('#turn').on('click', function () {
      if (!turn.current()) { return; }
      turn.toggle();
      characters.current(false);
      syncTurn();
    });

    dom('#canvas')
    .on('contextmenu', function (event) {
      event.preventDefault();
    })
    .on('mouseup', function (event) {
      var BTN = {
        0: 'left',
        1: 'middle',
        2: 'right'
      };

      var btn = BTN[event.button],
          pos = uiCell.idPos(event.target.parentNode.id);

      actionHandler(btn, pos);
      syncCharacters();
      syncTurn();
      render.activeCharacter();
    });
  };

  var init = function () {
    render.map();
    syncTurn();
    syncCharacters();
    setDomListeners();
    setStorageListeners();
  };

  return {
    init: init
  };
});
