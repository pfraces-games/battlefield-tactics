define('ui.tabs', function (require) {
  'use strict';

  var dom =      require('domo').use({
    on:          require('domo.on'),
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass')
  });

  var tabs = function (tabgroup) {
    tabgroup = tabgroup ? '.' + tabgroup : '';

    var tab = '.tabs' + tabgroup + ' > .tab',
        tabActive = tab + '.active';

    dom(tab).on('click', function () {
      dom(tabActive).removeClass('active');
      dom(this).addClass('active');
    });
  };

  return tabs;
});
