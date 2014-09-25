define.root(function (require) {
  'use strict';
  
  var characterModel = require('app.model.character'),
      ui             = require('app.ui');

  // sample characters

  characterModel.add({
    team: 'red',
    direction: 'SE',
    health: 10,
    pos: { x: 3, y: 3 }
  });

  characterModel.add({
    team: 'red',
    direction: 'E',
    health: 10,
    pos: { x: 7, y: 5 }
  });

  characterModel.add({
    team: 'blue',
    direction: 'NW',
    health: 10,
    pos: { x: 12, y: 7 }
  });

  characterModel.add({
    team: 'blue',
    direction: 'N',
    health: 10,
    pos: { x: 10, y: 10 }
  });

  ui.init();
});
