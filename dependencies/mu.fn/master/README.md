fn
==

Collection of basic functional helpers

Usage
-----

### fn.apply

### fn.partial

### fn.debounce

https://remysharp.com/2010/07/21/throttling-function-calls

```js
dom('#name').on('input', debounce(function (event) {
  model.name(dom(this).val());
}, 250));
```
