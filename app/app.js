define.root(function (require) {
  'use strict';
  
  var characters = require('app.model.characters'),
      ui         = require('app.ui');

  // sample characters

  characters.add({
    team: 'red',
    direction: 'southeast',
    health: 10,
    pos: { x: 3, y: 3 }
  });

  characters.add({
    team: 'red',
    direction: 'east',
    health: 10,
    pos: { x: 7, y: 5 }
  });

  characters.add({
    team: 'blue',
    direction: 'northwest',
    health: 10,
    pos: { x: 12, y: 7 }
  });

  characters.add({
    team: 'blue',
    direction: 'north',
    health: 10,
    pos: { x: 10, y: 10 }
  });

  ui.init();
});
