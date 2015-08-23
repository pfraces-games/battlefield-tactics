define('app.weapons', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      create = require('app.weapons.create');

  var init = function () {
    tab.group('weapons');
    create.init();
  };

  return {
    init: init
  };
});