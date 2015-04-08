define('app.battle', function (require) {
  'use strict';

  var domo          = require('domo'),
      actionHandler = require('app.battle.actionHandler'),
      characters    = require('app.model.characters'),
      turn          = require('app.model.turn'),
      render        = require('app.battle.render'),
      uiCell        = require('app.battle.cell'),
      firebase      = require('firebase');

  var dom = domo.use({
    on: require('domo.on')
  });

  var syncCharacters = function () {
    firebase.child('battle/characters').set(characters.model());
  };

  var syncTurn = function () {
    firebase.child('battle/turn').set(turn.model());
  };

  var setStorageListeners = function () {
    firebase.child('battle/characters').on('value', function (snapshot) {
      characters.model(snapshot.val());
      render.characters();
      render.activeCharacter();
    });

    firebase.child('battle/turn').on('value', function (snapshot) {
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
