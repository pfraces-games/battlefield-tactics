Roadmap
=======

Iteration 10: CRUDs
-------------------

*   [DONE] weapons
*   characters
*   soldiers
*   squads

Iteration 11: layout refactor
-----------------------------

*   use proof of concept
*   panels inside views
*   bottom bar
    *   chat (width 100%)
    *   notifications

Iteration 13: rooms
-------------------

*   crud
*   isolated rooms
*   waiting room
*   render battle from stored data

Next iterations
===============

Gameplay
--------

### battle

*   path preview
*   lock client during enemy turn
*   widget: team view
*   widget: current soldier stats
*   finish battle: on 'give up'
*   finish battle: when no more enemies

### engine

*   accuracy
*   time units
*   visibility

### maps

*   crud
*   fullscreen
*   battle widget: map
*   scrolling
*   share viewport between devices

UX
--

*   error messages
*   autocomplete with drop down
*   chat
*   notifications

Renders
-------

*   canvas api
*   bitmap animations
*   cenital render
*   dimetric render
*   isometric render

Architecture
------------

### view/model bindings

*   create `dom.bind`

### ui components

*   decouple logic from markup and style

#### ui.tab

refactor:

*   the api is not usable
*   ability to create tabs dynamically
*   ability to show/hide tabs
*   ability to change tab names

### directives

*   directives library
*   include
*   repeat
*   if
*   ui components

### build system

*   gulp
*   sass
*   source maps
*   eslint

### unit tests

*   mocha
*   expect

### backend

*   nodejs + mongodb
