define('ui.tab', function (require) {
  'use strict';

  var dom =      require('domo').use({
    on:          require('domo.on'),
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass'),
    toggleClass: require('domo.toggleClass')
  });

  var TAB_PREFIX = 'tab-';

  var enable = function (tab) {
    dom('#' + TAB_PREFIX + tab).addClass('visible');
  };

  var disable = function (tab) {
    dom('#' + TAB_PREFIX + tab).removeClass('visible');
  };

  var active = function (group, tab) {
    var groupClass = '.' + TAB_PREFIX + group,
        groupTabs = '.tabs' + ' > .tab' + groupClass,
        activeTab = groupTabs + '.active',
        targetTab = '#' + TAB_PREFIX + tab,
        visibleContent = '.' + group + '.visible',
        targetContent = '#' + tab;

    dom(activeTab).removeClass('active');
    dom(targetTab).addClass('active');

    dom(visibleContent).removeClass('visible');
    dom(targetContent).addClass('visible');
  };

  var group = function (tabgroup, func) {
    var groupClass = tabgroup ? '.' + TAB_PREFIX + tabgroup : '',
        groupTabs = '.tabs' + ' > .tab' + groupClass;

    dom(groupTabs).on('click', function () {
      var contentId = this.id.slice(TAB_PREFIX.length);
      active(tabgroup, contentId);
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

  return {
    enable: enable,
    disable: disable,
    active: active,
    group: group,
    pin: pin
  };
});
