define('app.state.team', function () {
  'use strict';

  var notifyChange,
      currentTeam;

  var onChange = function (fn) {
    notifyChange = fn;
  };

  var get = function () {
    return currentTeam;
  };

  var set = function (team) {
    if (notifyChange) { notifyChange(team, currentTeam); }
    currentTeam = team;
    return get();
  };

  var toggle = function () {
    if (currentTeam === 'red') { return set('blue'); }
    return set('red');
  };

  return {
    onChange: onChange,
    get: get,
    set: set,
    toggle: toggle
  };
});
