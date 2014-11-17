define('app.characters', function (require) {
  'use strict';

  var tab = require('ui.tab');

  var init = function () {
    tab.group('characters');
  };

  return {
    init: init
  };
});
