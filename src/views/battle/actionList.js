define('app.battle.actionList', function (require) {
  'use strict';

  var each       = require('mu.list.each'),
      filter     = require('mu.list.filter'),
      nodes      = require('app.battle.pathNodes'),
      direction  = require('app.battle.pathDirection'),
      characters = require('battle.model.characters'),
      cells      = require('battle.model.cells'),
      turn       = require('battle.model.turn');

  var select = function (target) {
    if (!target) { return; }

    var currentTeam = turn.current() || turn.current(target.team);
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
    if (turn.current() === target.team) { return; }

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

  return {
    select: select,
    shoot: shoot,
    move: move,
    rotate: rotate,
    scroll: scroll
  };
});
