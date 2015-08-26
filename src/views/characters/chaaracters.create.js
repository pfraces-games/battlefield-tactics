define('app.characters.create', function (require) {
  'use strict';

  var model   = require('model'),
      storage = require('storage');

  var dom     = require('domo').use({
    onInput   : require('domo.on.input'),
    onSubmit  : require('domo.on.submit')
  });

  var init = function () {
    var character = model({
      name: '',
      value: 0,
      constitution: 0,
      agility: 0,
      accuracy: 0
    });

    dom('#characters-new-name').onInput(character.name);
    dom('#characters-new-value').onInput(character.value);
    dom('#characters-new-constitution').onInput(character.constitution);
    dom('#characters-new-agility').onInput(character.agility);
    dom('#characters-new-accuracy').onInput(character.accuracy);

    dom('#characters-new-submit')
    .onSubmit(storage.save('characters', null, character.snapshot));
  };

  return {
    init: init
  };
});
