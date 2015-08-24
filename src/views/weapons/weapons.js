define('app.weapons', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      master = require('app.weapons.master'),
      detail = require('app.weapons.detail');

  var init = function () {
    tab.group('weapons');

    master.init();
    detail.init();
  };

  return {
    init: init
  };
});