is
==

Collection of basic type checks

Usage
-----

```js
var is = require('mu.is');

console.log(is.defined());            // false
console.log(is.defined(null));        // true
console.log(is.defined(2));           // true

console.log(is.number(2));            // true
console.log(is.number('2'));          // true (feature detection)
console.log(is.number('a'));          // false

console.log(is.string('a'));          // true

console.log(is.array([]));            // true
console.log(is.array({ length: 0 })); // true (feature detection)
console.log(is.array({}));            // false

console.log(is.object({}));           // true
console.log(is.object([]));           // false
```

Install
-------

    bower install mu.is

Motivation
----------

Straightforward type detection with a hint of feature detection

References
----------

*   [T.J. Crowder's post about types][1]
*   [jsPerf: is-scalar][2]

[1]: http://blog.niftysnippets.org/2010/09/say-what.html
[2]: http://jsperf.com/is-scalar
