define('app.model.turn', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined');

  var currentTurn = false;

  var model = function (update) {
    if (isDefined(update)) { currentTurn = update; }
    return currentTurn;
  };

  var current = function (turn) {
    if (isDefined(turn)) { currentTurn = turn; }
    return currentTurn;
  };

  var toggle = function () {
    if (currentTurn === 'red') { return current('blue'); }
    return current('red');
  };

  return {
    model: model,
    current: current,
    toggle: toggle
  };
});
