define('app.ui.template.cell', function () {
  'use strict';

  var cell = function (cellId, terrain) {
    return '' + 
      '<div id="' + cellId + '" class="cell">' +
        '<div class="terrain ' + terrain + '"></div>' +
        '<div class="selector"></div>' +
      '</div>';
  };

  return cell;
});
