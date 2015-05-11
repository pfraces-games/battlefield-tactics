define('app.storage.squads', function (require) {
  'use strict';

  var firebase = require('firebase');

  var squads = firebase.child('squads');

  var save = function (squad) {
    squads.push(squad);
  };

  return {
    save: save
  };
});
