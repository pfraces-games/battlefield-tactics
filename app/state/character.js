define('app.state.character', function () {
  'use strict';

  var notifyChange,
      currentCharacter;

  var onChange = function (fn) {
    notifyChange = fn;
  };

  var get = function () {
    return currentCharacter;
  };

  var set = function (character) {
    if (notifyChange) { notifyChange(character, currentCharacter); }
    currentCharacter = character;
    return get();
  };

  return {
    onChange: onChange,
    get: get,
    set: set
  };
});
