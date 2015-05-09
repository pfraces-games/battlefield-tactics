domo.repeater
=============

A [domo plugin](https://github.com/domojs/domo) to repeat elements

Usage
-----

```html
<div class="repeater-containter">
  <div id="repeatme">
    <input />
  </div>
</div>

<button id="repeat">repeat</button>
```

```js
var dom    = require('domo').use({
  on       : require('domo.on'),
  repeater : require('domo.repeater')
});

var repeat = dom('#repeatme').repeater();
dom('#repeat').on('click', repeat);
```
