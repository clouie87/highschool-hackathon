
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    //this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('background', 'assets/bg.png');
    this.load.image('ground', 'assets/ground1.png');

    this.load.image('cheese', 'assets/cheeseMenu.png');

    this.load.image('controls', 'assets/controls.png');

    this.load.image('menu', 'assets/menu.gif');
    this.load.image('end', 'assets/endgif.gif');

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

    this.load.spritesheet('bird', 'assets/nose1.png', 33, 50, 4);
    this.load.spritesheet('pipe', 'assets/cheese1.png', 78, 282, 2);




  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
