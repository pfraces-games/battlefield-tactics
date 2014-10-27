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
    dom('.view').removeClass('visible');
    dom('#' + view).addClass('visible');
    dom('.tab').removeClass('selected');
    dom('#show-' + view).addClass('selected');
  };

  var enableViewTab = function (view) {
    dom('#show-' + view)
    .addClass('visible')
    .on('click', partial(setView, view)); 
  };

  var disableViewTab = function (view) {
    dom('#show-' + view)
    .removeClass('visible');
  };

  var init = function () {
    setView('home');
  };

  return {
    enable: enableViewTab,
    disable: disableViewTab,
    init: init
  };
});
