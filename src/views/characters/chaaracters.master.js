define('app.characters.master', function (require) {
  'use strict';

  var partial = require('mu.fn.partial'),
      model   = require('model'),
      storage = require('storage'),
      detail  = require('app.characters.detail');

  var dom     = require('domo').use({
    html      : require('domo.html'),
    remove    : require('domo.remove'),
    repeater  : require('domo.repeater'),
    onClick   : require('domo.on.click')
  });

  var characterModel = partial(model, {
    id: '',
    name: '',
    value: 0,
    constitution: 0,
    agility: 0,
    accuracy: 0
  });

  var init = function () {
    var $character = dom('.characters-master-item').repeater();

    storage.each('characters', function (item, onRemove, onUpdate) {
      var character = characterModel(),
          $node = $character();

      character.update(item);
      onRemove(dom($node).remove);
      onUpdate(character.update);

      character.on('name', dom('.characters-master-item-name', $node).html);
      character.on('value', dom('.characters-master-item-value', $node).html);
      character.on('agility', dom('.characters-master-item-agility', $node).html);
      character.on('constitution', dom('.characters-master-item-constitution', $node).html);
      character.on('accuracy', dom('.characters-master-item-accuracy', $node).html);

      dom($node).onClick(partial(detail.load, character.id()));
    });

    dom('#characters-master-create').onClick(detail.load);
  };

  return {
    init: init
  };
});