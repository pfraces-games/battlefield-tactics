define('app.weapons', function (require) {
  'use strict';

  var tab = require('ui.tab');

  var dom =      require('domo').use({
    addClass:    require('domo.addClass'),
    removeClass: require('domo.removeClass')
  });

  var init = function () {
    tab.group('weapons', function (contentId) {
      dom('.weapons.section.visible').removeClass('visible');
      dom('#' + contentId).addClass('visible');
    });
  };

  return {
    init: init
  };
});
