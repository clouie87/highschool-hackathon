
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.controls = this.game.add.sprite(0,0, 'controls');

    var style = { font: '65px Arial', fill: '#ffc000', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 1, '');
    this.sprite.anchor.setTo(0.5, 0.5);

    //this.titleText = this.game.add.text(this.game.world.centerX, 400, 'PLAY', style);
    //this.titleText.anchor.setTo(0.5, 0.5);

    //this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'PLAY', { font: '16px Arial', fill: '#ffc000', align: 'center'});
    //this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;
