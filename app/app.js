define.root(function (require) {
  'use strict';
  
  var model = require('app.model'),
      ui    = require('app.ui');

  // sample characters

  model.at(3, 3).character = {
    team: 'red',
    id: 0,
    direction: 'SE',
    health: 10
  };

  model.at(7, 5).character = {
    team: 'red',
    id: 1,
    direction: 'E',
    health: 10
  };

  model.at(12, 7).character = {
    team: 'blue',
    id: 0,
    direction: 'NW',
    health: 10
  };

  model.at(10, 10).character = {
    team: 'blue',
    id: 1,
    direction: 'N',
    health: 10
  };

  ui.init();
});
