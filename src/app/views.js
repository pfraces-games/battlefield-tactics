define('app.views', function (require) {
  'use strict';

  var partial = require('mu.fn.partial'),
      domo    = require('domo');

  var dom = domo.use({
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    on:          require('domo.on')
  });

  var setView = function (view) {
    dom('.view').removeClass('current');
    dom('#' + view).addClass('current');
    dom('.tab').removeClass('current');
    dom('#show-' + view).addClass('current');
  };

  var viewTab = function (view) {
    dom('#show-' + view).on('click', partial(setView, view)); 
  };

  var setEventHandlers = function () {
    viewTab('battle');
    viewTab('character-class');
    viewTab('weapon');
    viewTab('soldier');
    viewTab('squad');
    viewTab('rooms');
    viewTab('login');
    viewTab('signup');
    viewTab('profile');
  };

  var init = function () {
    setEventHandlers();
    setView('battle');
  };

  return {
    init: init
  };
});
