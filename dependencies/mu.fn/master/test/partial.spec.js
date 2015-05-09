describe('partial', function () {
  var partial = require('mu.fn.partial');

  var echo = function () {
    return [].slice.call(arguments);
  };

  it('should return a function', function () {
    expect(partial(echo)).toBeFunction();
  });

  it('should partially apply an arg', function () {
    expect(partial(echo, 1)()).toBe(1);
  });

  it('should apply an arg', function () {
    expect(partial(echo)(1)).toBe(1);
    expect(partial(echo, 1)(2)).toEqual([1, 2]);
  });

  it('should work with arrays', function () {
    expect(partial(echo, [1])(2)).toEqual([[1], 2]);
    expect(partial(echo, 1)([2])).toEqual([1, [2]]);
    expect(partial(echo, [1])([2])).toEqual([[1], [2]]);
  });
});
