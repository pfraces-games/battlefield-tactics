define('app.squads', function (require) {
  'use strict';

  var tab = require('ui.tab');

  var init = function () {
    tab.group('squads');
  };

  return {
    init: init
  };
});
