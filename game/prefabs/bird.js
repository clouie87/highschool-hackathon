'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('exhale');
  this.animations.play('exhale', 6, true);


  this.game.physics.arcade.enableBody(this);

  // initialize your prefab here

};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  if(this.angle<40){
    this.angle+= 3;
  };

  // write your prefab's specific update code here

};

Bird.prototype.exhale=function(){
  this.game.add.tween(this).to({angle: -40}, 100).start();
  this.body.velocity.y = -200;

};

module.exports = Bird;
