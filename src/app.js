define.root(function (require) {
  'use strict';
  
  var tab         = require('ui.tab'),
      characters  = require('app.model.characters'),
      controllers = require('app.controllers');

  var dom =      require('domo').use({
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass')
  });

  // main tabs

  controllers.init();

  tab.group('view', function (contentId) {
    dom('.view.visible').removeClass('visible');
    dom('#' + contentId).addClass('visible');

    dom('.view-panel.visible').removeClass('visible');
    dom('#panel-' + contentId).addClass('visible');
  });

  tab.pin();

  // active views

  tab.enable('login');
  tab.enable('leaderboard');

  tab.enable('profile');
  tab.enable('notifications');
  tab.enable('rooms');

  tab.enable('battle');

  tab.enable('characters');
  tab.enable('weapons');
  tab.enable('maps');

  tab.enable('soldiers');
  tab.enable('squads');

  tab.enable('chat-foo');
  tab.enable('chat-bar');

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
});
