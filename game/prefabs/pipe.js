'use strict';

var Pipe = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pipe', frame);
  this.game.physics.arcade.enableBody(this);
  this.anchor.setTo(0.5, 0.5);



  this.body.allowGravity=false;
  this.body.immovable = true;

  // initialize your prefab here

};

Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Pipe;
