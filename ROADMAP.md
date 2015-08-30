Roadmap
=======

Iteration 11: layout refactor
-----------------------------

*   use proof of concept
*   panels inside views
*   bottom bar
    *   chat (width 100%)
    *   notifications

Iteration 12: rooms
-------------------

*   crud
*   isolated rooms
*   waiting room
*   render battle from stored data

Next iterations
===============

Bugs
----

*   [bug] master views: data is duplicated on relogin
*   [bug] detail views: numeric fields show default value when input is empty
*   [bug] master views: show arrow cursor on table header

Gameplay
--------

### battle

*   lock client during enemy turn
*   finish battle: on 'give up'
*   finish battle: when no more enemies
*   widget: team view
*   widget: current soldier stats
*   path preview

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

*   detail views: realtime updates
*   detail views: autocomplete with drop down
*   error messages
*   notifications
*   chat

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
