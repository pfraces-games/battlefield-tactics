define('app.characters', function (require) {
  'use strict';

  var tab    = require('ui.tab'),
      master = require('app.characters.master'),
      detail = require('app.characters.detail');

  var init = function () {
    tab.group('characters');
    master.init();
    detail.init();
  };

  return {
    init: init
  };
});