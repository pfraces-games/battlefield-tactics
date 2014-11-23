define('app.soldiers', function (require) {
  'use strict';

  var tab = require('ui.tab');

  var init = function () {
    tab.group('soldiers');
  };

  return {
    init: init
  };
});
