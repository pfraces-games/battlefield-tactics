define('app.views', function (require) {
  'use strict';

  var domo    = require('domo'),
      tab     = require('ui.tab');

  var dom = domo.use({
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    toggleClass: require('domo.toggleClass'),
    on:          require('domo.on')
  });

  var showTab = function (tab) {
    dom('#tab-' +  tab).addClass('visible');
  };

  var hideTab = function (tab) {
    dom('#tab-' + tab).removeClass('visible');
  };

  var init = function () {
    var TAB_PREFIX = 'tab-';

    // main tabs

    tab.group('tab-view', function (node) {
      var view = node.id.slice(TAB_PREFIX.length);

      dom('.view.visible').removeClass('visible');
      dom('#' + view).addClass('visible');

      dom('.view-panel.visible').removeClass('visible');
      dom('#panel-' + view).addClass('visible');
    });

    tab.pin(function (node) {
      var view = node.id.slice(TAB_PREFIX.length);
      dom('#' + view).toggleClass('visible');
    });

    // login tabs

    tab.group('tab-login', function (node) {
      var section = node.id.slice(TAB_PREFIX.length);

      dom('.login.section.visible').removeClass('visible');
      dom('#' + section).addClass('visible');
    });
  };

  return {
    enable: showTab,
    disable: hideTab,
    init: init
  };
});
