Roadmap
=======

Iteration 10: "list items" controllers
--------------------------------------

*   [DONE] weapons: list items controller
*   squads: list items controller
*   soldiers: list items controller
*   characters: list items controller

Iteration 11: "update item" controllers
---------------------------------------

*   weapons: update item controller
*   squads: update item controller
*   soldiers: update item controller
*   characters: update item controller

Next iterations
===============

Gameplay
--------

### rooms

*   crud
*   isolated rooms
*   waiting room
*   render battle from stored data

### layout refactor

*   use proof of concept
*   panels inside views
*   bottom bar
    *   chat (width 100%)
    *   notifications

### cruds

*   move profile:shared views to an admin section
*   autocomplete with drop down
*   error messages

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

### chat

### notifications

### renders

*   canvas api
*   bitmap animations
*   cenital render
*   dimetric render
*   isometric render

Architecture
------------

### realtime controllers

*   use model in master views
*   listen "child_changed" events in master views
*   listen to "child_changed" events in detail views
*   listen to "child_removed" events in detail views

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
