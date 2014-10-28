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
    dom('.tab').removeClass('selected');
    dom('#tab-' + view).addClass('selected');


    dom('.view').removeClass('visible');
    dom('#' + view).addClass('visible');

    dom('.view-panel').removeClass('visible');
    dom('#panel-' + view).addClass('visible');
  };

  var enableViewTab = function (view) {
    dom('#tab-' + view)
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
