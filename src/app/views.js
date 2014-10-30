define('app.views', function (require) {
  'use strict';

  var partial = require('mu.fn.partial'),
      domo    = require('domo');

  var dom = domo.use({
    hasClass:    require('domo.hasClass'),
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    on:          require('domo.on')
  });

  var view = function (name) {    
    // HACK: determine if there is a popup visible
    var isBackground = dom('.popup-tab.selected').hasClass('selected') === true;

    if (isBackground) {
      dom('.view-tab.background').removeClass('background');
      dom('#tab-' + name).addClass('background');
    } else {
      dom('.view-tab.selected').removeClass('selected');
      dom('#tab-' + name).addClass('selected');
    }

    dom('.view.visible').removeClass('visible');
    dom('#' + name).addClass('visible');

    dom('.view-panel.visible').removeClass('visible');
    dom('#panel-' + name).addClass('visible');
  };

  var popup = function (name) {
    var isSelected = dom('#tab-' + name).hasClass('selected');

    dom('.popup-tab.selected').removeClass('selected');
    dom('.popup.visible').removeClass('visible');
    
    if (isSelected) {
      dom('.view-tab.background')
      .removeClass('background').addClass('selected');
      
      return;
    }

    dom('.view-tab.selected')
    .removeClass('selected').addClass('background');
    
    dom('#tab-' + name).addClass('selected');
    dom('#' + name).addClass('visible');
  };

  var enableView = function (name) {
    var tab = dom('#tab-' +  name),
        isPopup = tab.hasClass('popup-tab'),
        handler = isPopup ? popup : view;

    tab
    .addClass('visible')
    .on('click', partial(handler, name)); 
  };

  var disableView = function (view) {
    dom('#tab-' + view).removeClass('visible');
  };

  var init = function () {
    view('home');
  };

  return {
    enable: enableView,
    disable: disableView,
    init: init
  };
});
