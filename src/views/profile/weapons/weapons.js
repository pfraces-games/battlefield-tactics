define('app.weapons', function (require) {
  'use strict';

  var tab = require('ui.tab');

  var init = function () {
    tab.group('weapons');
  };

  return {
    init: init
  };
});
