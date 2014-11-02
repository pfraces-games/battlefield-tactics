define('ui.tab', function (require) {
  'use strict';

  var dom =      require('domo').use({
    on:          require('domo.on'),
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    toggleClass: require('domo.toggleClass')
  });

  var group = function (tabgroup, func) {
    tabgroup = tabgroup ? '.' + tabgroup : '';

    var tab = '.tabs' + ' > .tab' + tabgroup,
        tabActive = tab + '.active';

    dom(tab).on('click', function () {
      dom(tabActive).removeClass('active');
      dom(this).addClass('active');
      func(this);
    });
  };

  var pin = function (func) {
    dom('.pin').on('click', function () {
      dom(this).toggleClass('active');
      func(this);
    });
  };

  return {
    group: group,
    pin: pin
  };
});
