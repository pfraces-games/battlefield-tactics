define('app.actions', function (require) {
  'use strict';

  var partial    = require('mu.fn.partial'),
      each       = require('mu.list.each'),
      filter     = require('mu.list.filter'),
      nodes      = require('app.path.nodes'),
      direction  = require('app.path.direction'),
      characters = require('app.model.characters'),
      cells      = require('app.model.cells'),
      teams      = require('app.model.teams');

  var select = function (target) {
    if (!target) { return; }

    var currentTeam = teams.current() || teams.current(target.team);
    if (currentTeam !== target.team) { return; }

    characters.current(target);
    return target;
  };

  var hit = function (target) {
    var WEAPON_DAMAGE = 4;

    var health = target.health -= WEAPON_DAMAGE; 

    if (health <= 0) {
      characters.remove(target);
      delete cells.at(target.pos).character;
    }
  };

  var shoot = function (current, target) {
    if (!current || !target) { return; }
    if (teams.current() === target.team) { return; }

    var path = nodes(current.pos, target.pos);
    current.direction = direction(path[0].pos, path[1].pos);

    var collisions = filter(path, function (node, index) {
      if (index === 0) { return false; }
      return node.terrain === 'W' || node.character;
    });

    var collision = collisions[0];

    if (collision && collision.character) { hit(collision.character); }
    return current;
  };

  var canMove = function () {
    var hasCollided;

    return function (node, index) {
      if (index === 0) { return false; }
      var isCollision = node.terrain !== 'G' || node.character;
      if (isCollision && !hasCollided) { hasCollided = true; }
      return !hasCollided;
    };
  };

  var move = function (current, dest) {
    if (!current || !dest) { return; }
    if (dest.character) { return; }

    var path = nodes(current.pos, dest.pos);
    current.direction = direction(path[0].pos, path[1].pos);
    path = filter(path, canMove());

    each(path, function (node) {
      current.direction = direction(current.pos, node.pos);

      delete cells.at(current.pos).character;
      current.pos = node.pos;
      cells.at(current.pos).character = current;
    });

    return current;
  };

  var rotate = function (current, dest) {
    if (!current || !dest) { return; }
    var path = nodes(current.pos, dest.pos);
    current.direction = direction(path[0].pos, path[1].pos);
    return current;
  };

  var scroll = function () { /* TODO */ };  

  var or = function (actions) {
    return each(actions, function (action) {
      return action();
    });
  };

  var actions = function (btn, targetPos) {
    var currentCharacter = characters.current(),
        node = cells.at(targetPos);

    if (btn === 'left') {
      return or([
        partial(select, node.character),
        partial(shoot, currentCharacter, node.character),
        partial(move, currentCharacter, node)
      ]);
    }

    if (btn === 'right') {
      return or([
        partial(rotate, currentCharacter, node)
      ]);
    }

    if (btn === 'middle') {
      return or([
        partial(scroll)
      ]);
    }
  };

  return actions;
});
