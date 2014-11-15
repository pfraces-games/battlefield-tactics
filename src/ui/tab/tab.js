define('ui.tab', function (require) {
  'use strict';

  var dom =      require('domo').use({
    on:          require('domo.on'),
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    toggleClass: require('domo.toggleClass')
  });

  var TAB_PREFIX = 'tab-';

  var group = function (tabgroup, func) {
    tabgroup = tabgroup ? '.' + TAB_PREFIX + tabgroup : '';

    var tab = '.tabs' + ' > .tab' + tabgroup,
        tabActive = tab + '.active';

    dom(tab).on('click', function () {
      dom(tabActive).removeClass('active');
      dom(this).addClass('active');

      var contentId = this.id.slice(TAB_PREFIX.length);
      if (func) { func(contentId); }
    });
  };

  var pin = function (func) {
    dom('.pin').on('click', function () {
      dom(this).toggleClass('active');

      var view = this.id.slice(TAB_PREFIX.length);
      dom('#' + view).toggleClass('visible');

      if (func) { func(view); }
    });
  };

  var enable = function (tab) {
    dom('#' + TAB_PREFIX + tab).addClass('visible');
  };

  var disable = function (tab) {
    dom('#' + TAB_PREFIX + tab).removeClass('visible');
  };

  return {
    group: group,
    pin: pin,
    enable: enable,
    disable: disable
  };
});
