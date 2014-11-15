define('app.battle.tpl.character', function () {
  'use strict';

  var character = function (team, direction) {
    return '' +
      '<div class="character ' + team + ' ' + direction + '">' +
        '<div class="circle"></div>' +
        '<div class="line"></div>' +
        '<div class="arrow"></div>' +
      '</div>';
  };

  return character;
});
