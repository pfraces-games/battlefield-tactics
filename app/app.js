define.root(function (require) {
  'use strict';
  
  var characterModel = require('app.model.character'),
      ui             = require('app.ui');

  // sample characters

  characterModel.add({
    team: 'red',
    direction: 'southeast',
    health: 10,
    pos: { x: 3, y: 3 }
  });

  characterModel.add({
    team: 'red',
    direction: 'east',
    health: 10,
    pos: { x: 7, y: 5 }
  });

  characterModel.add({
    team: 'blue',
    direction: 'northwest',
    health: 10,
    pos: { x: 12, y: 7 }
  });

  characterModel.add({
    team: 'blue',
    direction: 'north',
    health: 10,
    pos: { x: 10, y: 10 }
  });

  ui.init();
});
