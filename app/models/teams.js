define('app.model.teams', function (require) {
  'use strict';

  var isDefined = require('mu.is.defined');

  var currentTeam = false;

  var current = function (team) {
    if (isDefined(team)) { currentTeam = team; }
    return currentTeam;
  };

  var toggle = function () {
    if (currentTeam === 'red') { return current('blue'); }
    return current('red');
  };

  return {
    current: current,
    toggle: toggle
  };
});
