define('app.squads', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      master = require('app.squads.master'),
      detail = require('app.squads.detail');

  var init = function () {
    tab.group('squads');
    master.init();
    detail.init();
  };

  return {
    init: init
  };
});
