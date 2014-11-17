define('app.maps', function (require) {
  'use strict';

  var tab = require('ui.tab');

  var init = function () {
    tab.group('maps');
  };

  return {
    init: init
  };
});
