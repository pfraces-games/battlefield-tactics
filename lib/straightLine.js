define('straightLine', function (require) {
  'use strict';

  var map = require('mu.list.map');

  var abs    = Math.abs;

  var signum = function (number) {
    if (number > 0) { return 1; }
    if (number < 0) { return -1; }
    return 0;
  };

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
    return Math.round(abs(number)) * signum(number);
  };

  var arr = function (length) {
    var arr = [];
    arr.length = length;
    return arr;
  };

  var straightLine = function (start, end) {
    var delta = {
      x: end.x - start.x,
      y: end.y - start.y
    };

    var switchAxis = abs(delta.y) > abs(delta.x),
        high = switchAxis ? delta.y : delta.x,
        low = switchAxis ? delta.x : delta.y,
        ratio = high / low,
        sign = signum(high);

    var linePath = map(arr(abs(high)), function (item, index) {
      var x = index * sign,
          y = round(x / ratio);

      var pos = {
        x: switchAxis ? y : x,
        y: switchAxis ? x : y
      };
      
      return {
        x: start.x + pos.x,
        y: start.y + pos.y
      };
    });

    linePath[abs(high)] = end;
    return linePath;
  };

  return straightLine;
});
