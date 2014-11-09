tabs
====

page tabs (markup)
------------------

### template

```html
<div class="tabs {{ orientation }}">
  <div id="tab-{{ viewname }}" class="tab tab-view">{{ viewname }}</div>
  ...
</div>
```

*   `orientation`

    *   `top`
    *   `bottom`
    *   `left`
    *   `right`

### example

```html
<div class="tabs top">
  <div id="tab-login" class="tab tab-view">login</div>
</div>
```

page view (markup)
------------------

### template

```html
<div id="{{ viewname }}" class="view">
  ...
</div>
```

### example

```html
<div id="login" class="view">
</div>
```

view tabs markup
----------------

### template

```html
<div class="title">
  <h2>{{ section }}</h2>

  <div class="tabs {{ orientation }}">

    <div id="tab-{{ viewname }}-{{ section }}"
        class="tab tab-{{ viewname }} {{ active }}">
      {{ section }}
    </div>

    ...

  </div>
</div>
```

### example

```html
<div class="title">
  <h2>login</h2>

  <div class="tabs top">
    <div id="tab-login-login" class="tab tab-login active">
      login
    </div>
  </div>
</div>
```

view section (markup)
---------------------

### template

```html
<div id="{{ viewname }}-{{ section }}"
    class="{{ viewname }} section {{ visible }}">

    ...

</div>
```

### example

```html
<div id="login-login" class="login section visible">
</div>
```

view tabs (script)
------------------

### template

```js
var tab = require('ui.tab');

var TAB_PREFIX = 'tab-';

tab.group('tab-{{ viewname }}', function (node) {
  var section = node.id.slice(TAB_PREFIX.length);

  dom('.{{ viewname }}.section.visible').removeClass('visible');
  dom('#' + section).addClass('visible');
});
```

### example

**views.js:**

```js
tab.group('tab-login', function (node) {
  var section = node.id.slice(TAB_PREFIX.length);

  dom('.login.section.visible').removeClass('visible');
  dom('#' + section).addClass('visible');
});
```
