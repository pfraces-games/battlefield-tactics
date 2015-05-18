define('app.squads', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      create = require('app.squads.create');

  var init = function () {
    tab.group('squads');
    create.init();
  };

  return {
    init: init
  };
});
