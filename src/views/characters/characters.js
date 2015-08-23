define('app.characters', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      create = require('app.characters.create');

  var init = function () {
    tab.group('characters');
    create.init();
  };

  return {
    init: init
  };
});