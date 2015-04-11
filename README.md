tufo
====

Odor unknown

Pre-requisites
--------------

1.  **git** (http://git-scm.org)
2.  **node + npm** (http://nodejs.org)
3.  **bower** (`npm install -g bower`)

Install
-------

    git clone https://github.com/pfraces-wip/tufo.git
    cd tufo
    npm install && bower install

Usage
-----

    cd /path/to/tufo
    grunt

Browse to [http://localhost:3000](http://localhost:3000)

Roadmap
-------

### Iteration #9: new item controllers

*   squads and soldiers under user model
*   `squads.js`: refactor list management
*   `squads.js`, `soldiers.js`: duplicated `int` and `filter` utils

### Iteration #10: list items controllers

*   squads
    *   controller: list items
*   soldiers
    *   controller: list items
*   characters
    *   controller: list items
*   weapons
    *   controller: list items

### Iteration #11: view item controllers

*   squads
    *   controller: view item
*   soldiers
    *   controller: view item
*   characters
    *   controller: view item
*   weapons
    *   controller: view item

### Iteration #12: rooms crud

*   isolated rooms
*   waiting room
*   render battle from stored data

### Next iterations

*   layout refactor
    *   use proof of concept
    *   panels inside views
    *   bottom bar
        *   chat (width 100%)
        *   notifications
*   move profile:shared to admin:content
    *   markup: admin
*   maps
    *   crud
    *   fullscreen
    *   scrolling
    *   share viewport between devices
*   battle
    *   path preview
    *   lock client during enemy turn
    *   widget: team view
    *   widget: current soldier stats
    *   finish battle: on 'give up'
    *   finish battle: when no more enemies
*   decouple ui components logic from markup and style
*   autocomplete component
*   model listeners
    *   pubsub library
    *   promises library
    *   chat
    *   notifications
    *   error messages
*   directives
    *   include
    *   repeat
    *   if
    *   ui components directives
*   engine
    *   accuracy
    *   time units
    *   visibility
*   isometric view
    *   canvas render
    *   bitmap animations
    *   cenital render
    *   dimetric render
    *   isometric render
*   build system: gulp + browserify + sass
    *   source maps
    *   nodeify
    *   publish modules to bower, npm
    *   eslint
    *   mocha
    *   expect
*   unit tests
*   backend: nodejs + mongodb

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
