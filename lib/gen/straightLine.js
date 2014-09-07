define('straightLine', function (require) {
  'use strict';

  var range = require('mu.list.range');

  var abs = Math.abs;

  /**
   * fix Math.round which causes unexpected results with negative numbers:
   * 
   * round(0.5)   === 1
   * round(0.51)  === 1
   *
   * round(-0.5)  === 0
   * round(-0.51) === -1
   */
  var round = function (number) {
    var isNegative = number < 0,
        ratio = isNegative ? -1 : 1,
        result = ratio * Math.round(ratio * number);
    
    return result;
  };

  var straightLine = function (start, end) {
    var delta = {
      x: end.x - start.x,
      y: end.y - start.y
    };

    var switchAxis = abs(delta.y) > abs(delta.x),
        deltaMax = switchAxis ? delta.y : delta.x,
        deltaMin = switchAxis ? delta.x : delta.y,
        ratio = deltaMax / deltaMin;

    var linePath = range(deltaMax, function (fast) {
      var slow = round(fast / ratio, 10);

      var pos = {
        x: switchAxis ? slow : fast,
        y: switchAxis ? fast : slow
      };
      
      return {
        x: start.x + pos.x,
        y: start.y + pos.y
      };
    });

    linePath[abs(deltaMax)] = end;
    return linePath;
  };

  return straightLine;
});
