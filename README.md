tufo
====

Odor unknown

Pre-requisites
--------------

1.  **git** (http://git-scm.org)
2.  **node + npm** (http://nodejs.org)
3.  **udm** (`npm install -g udm`)

Install
-------

    git clone https://github.com/pfraces-wip/tufo.git
    cd tufo
    npm install && udm

Usage
-----

    cd /path/to/tufo
    grunt

Browse to [http://localhost:3000](http://localhost:3000)

Hack
----

### Form controller: Basics

Using `<form>` and its `onSubmit` event we can delegate to the browser
the work of capturing `onKey` events

Create a `<form>` and several `<input>`s, all with ids

They can be wrapped in the desired layout boilerplate since we are going to
use its unique ids to find them

```html
<form id="{{ form_id }}">
  <input type="text" id="{{ input_id }}" />
  <button type="submit"></button>
</form>
```

Capture `onSubmit` event of the form and get the input values
with `.val()`

Prevent the default submit action of reloading the page

```js
dom('#{{ form_id }}').on('submit', function (event) {
  event.preventDefault();

  var scope = {
    field: dom('#{{ input_id }}').val()
  };

  save(scope);
});
```

### Form controller: 2-way data binding

**Brute force approach:**

Create a function with the parts of the UI to be updated

```js
var updateView = function () {
  dom('{{ selector }}').val(scope.computedValue());
};
```

Listen `onInput` events of the inputs by id

```js
dom('#{{ input_id }}').on('input', function () {
  scope.property = dom(this).val();
  updateView();
});
```
