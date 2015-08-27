define('app.soldiers', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      master = require('app.soldiers.master'),
      detail = require('app.soldiers.detail');

  var init = function () {
    tab.group('soldiers');
    master.init();
    detail.init();
  };

  return {
    init: init
  };
});