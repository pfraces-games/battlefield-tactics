define('app.controllers', function (require) {
  'use strict';

  var battle     = require('app.battle'),
      login      = require('app.login'),
      rooms      = require('app.rooms'),
      characters = require('app.characters'),
      weapons    = require('app.weapons'),
      maps       = require('app.maps'),
      soldiers   = require('app.soldiers'),
      squads     = require('app.squads');

  var init = function () {
    battle.init();
    login.init();
    rooms.init();
    characters.init();
    weapons.init();
    maps.init();
    soldiers.init();
    squads.init();
  };

  return {
    init: init
  };
});
