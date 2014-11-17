define('app.rooms', function (require) {
  'use strict';

  var tab = require('ui.tab');

  var init = function () {
    tab.group('rooms');
  };

  return {
    init: init
  };
});
