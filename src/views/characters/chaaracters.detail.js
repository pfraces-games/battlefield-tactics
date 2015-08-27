define('app.characters.detail', function (require) {
  'use strict';

  var partial   = require('mu.fn.partial'),
      model     = require('model'),
      storage   = require('storage'),
      tab       = require('ui.tab');

  var dom       = require('domo').use({
    addClass    : require('domo.addClass'),
    removeClass : require('domo.removeClass'),
    val         : require('domo.val'),
    html        : require('domo.html'),
    onClick     : require('domo.on.click'),
    onInput     : require('domo.on.input'),
    onSubmit    : require('domo.on.submit')
  });

  var view = model({
    characterId: ''
  });

  var character = model({
    name: '',
    value: 0,
    constitution: 0,
    agility: 0,
    accuracy: 0
  });

  var tabName = function (name) {
    dom('#tab-characters-detail')
    .html(name ? name : 'new character');
  };

  var init = function () {
    dom('#characters-detail-name').onInput(character.name);
    character.on('name', dom('#characters-detail-name').val);
    character.on('name', tabName);

    dom('#characters-detail-value').onInput(character.value);
    character.on('value', dom('#characters-detail-value').val);

    dom('#characters-detail-agility').onInput(character.agility);
    character.on('agility', dom('#characters-detail-agility').val);

    dom('#characters-detail-constitution').onInput(character.constitution);
    character.on('constitution', dom('#characters-detail-constitution').val);

    dom('#characters-detail-accuracy').onInput(character.accuracy);
    character.on('accuracy', dom('#characters-detail-accuracy').val);

    dom('#characters-detail-submit')
    .onSubmit(storage.save('characters', view.characterId, character.snapshot))
    .onSubmit(partial(tab.active, 'characters', 'characters-master'));

    dom('#characters-detail-delete')
    .onClick(storage.remove('characters', view.characterId))
    .onClick(partial(tab.active, 'characters', 'characters-master'));

    view.on('characterId', function (id) {
      if (id) { dom('#characters-detail-delete').removeClass('hidden'); }
      else { dom('#characters-detail-delete').addClass('hidden'); }
    });
  };

  var load = storage.filter('characters', 'id', function (item) {
    view.characterId(item ? item.id : '');
    character.update(item);
    tab.active('characters', 'characters-detail');
  });

  return {
    init: init,
    load: load
  };
});