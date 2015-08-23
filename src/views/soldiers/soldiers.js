define('app.soldiers', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      create = require('app.soldiers.create');

  var init = function () {
    tab.group('soldiers');
    create.init();
  };

  return {
    init: init
  };
});