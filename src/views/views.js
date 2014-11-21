define('app.views', function (require) {
  'use strict';

  var each    = require('mu.list.each'),
      storage = require('storage'),
      tab     = require('ui.tab');

  var dom =      require('domo').use({
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass')
  });

  var views = {
    login:      require('app.login'),
    logout:     require('app.logout'),
    battle:     require('app.battle'),
    rooms:      require('app.rooms'),
    soldiers:   require('app.soldiers'),
    squads:     require('app.squads'),
    characters: require('app.characters'),
    weapons:    require('app.weapons'),
    maps:       require('app.maps')
  };

  var VIEWS = {
    PUBLIC: ['leaderboard'],
    GUESTS: ['login'],
    MEMBERS: ['profile', 'rooms', 'battle'] // 'notifications'
  };

  var login = function () {
    each(VIEWS.MEMBERS, tab.enable);
    each(VIEWS.GUESTS, tab.disable);

    /*
    var isCurrentViewDisabled = each(VIEWS.GUESTS, function (view) {
      if (view === tab.current()) { return true; }
    });
    */
    var isCurrentViewDisabled = true;
    
    if (isCurrentViewDisabled) { tab.active('view', 'rooms'); }
  };

  var logout = function () {
    each(VIEWS.MEMBERS, tab.disable);
    each(VIEWS.GUESTS, tab.enable);

    /*
    var isCurrentViewDisabled = each(VIEWS.MEMBERS, function (view) {
      if (view === tab.current()) { return true; }
    });
    */
    var isCurrentViewDisabled = true;
    
    if (isCurrentViewDisabled) { tab.active('view', 'home'); }
  };

  var init = function () {
    each(views, function (view) { view.init(); });

    each(VIEWS.PUBLIC, tab.enable);
    each(VIEWS.GUESTS, tab.enable);

    storage.onAuth(function (auth) {
      if (auth) { login(); }
      else { logout(); }
    });

    tab.group('view', function (contentId) {
      dom('.view-panel.visible').removeClass('visible');
      dom('#panel-' + contentId).addClass('visible');
    });

    tab.pin();

    tab.enable('logout');

    tab.enable('characters');
    tab.enable('weapons');
    tab.enable('maps');

    tab.enable('soldiers');
    tab.enable('squads');

    tab.enable('chat-foo');
    tab.enable('chat-bar');
  };

  return {
    init: init
  };
});
