(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-reborn');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('instruction', require('./states/instruction'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/instruction":8,"./states/menu":9,"./states/play":10,"./states/preload":11}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y,width, height) {
  Phaser.TileSprite.call(this, game, x, y,width, height, 'ground');

  // initialize your prefab here
 this.game.physics.arcade.enableBody(this);
  this.body.allowGravity=false;
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Ground;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

var Pipe= require('./pipe');

var PipeGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  this.topPipe=new Pipe(this.game,0,0,0);
  this.add(this.topPipe);

  this.bottomPipe=new Pipe(this.game,0, 440, 1);
  this.add(this.bottomPipe);

  //this.setAll('body.velocity.x', -200);

  // initialize your prefab here

};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.reset = function(x, y) {

  // Step 1
  this.topPipe.reset(0,0);

  // Step 2
  this.bottomPipe.reset(0, 440); // Step 2

  // Step 3
  this.x = x;
  this.y = y;

  // Step 4
  this.setAll('body.velocity.x', -200);

  // Step 5
  this.hasScored = false;

  // Step 6
  this.exists = true;
};
PipeGroup.prototype.checkWorldBounds = function() {
  if(!this.topPipe.inWorld) {
    this.exists = false;
  }
};


PipeGroup.prototype.update = function() {
  this.checkWorldBounds();
};


//PipeGroup.prototype.update = function() {
//
//  // write your prefab's specific update code here
//
//};

module.exports = PipeGroup;

},{"./pipe":4}],6:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],7:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {

    this.end = this.game.add.sprite(0,0, 'end');

    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    //this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    //this.titleText.anchor.setTo(0.5, 0.5);

    //this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    //this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, '', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){

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

},{}],9:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.menu = this.game.add.sprite(0,0, 'menu');

    var style = { font: '65px Arial', fill: '#ffc000', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 188, 'cheese');
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
      this.game.state.start('instruction');
    }
  }
};

module.exports = Menu;

},{}],10:[function(require,module,exports){

  'use strict';

  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');
  var Pipe = require('../prefabs/pipe');
  var PipeGroup = require('../prefabs/pipeGroup');

  function Play() {}
  Play.prototype = {

    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y=500;

      this.background = this.game.add.sprite(0,0, 'background');

      this.bird = new Bird(this.game, 100, this.game.height/2);
      this.game.add.existing(this.bird);



      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      var exhaleKey=this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      exhaleKey.onDown.add(this.bird.exhale, this.bird);
      this.input.onDown.add(this.bird.exhale, this.bird);



      this.score=0;
      this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);
      this.scoreText.visible = true;

      this.pipeGenerator=this.game.time.events.loop(Phaser.Timer.SECOND*2.00,this.generatePipes,this);
      this.pipeGenerator.timer.start();
      this.pipes = this.game.add.group();
      //this.pipes.velocity.x = 0;

      this.ground= new Ground(this.game, 0, 410, 288, 96);
      this.game.add.existing(this.ground);

    },
    update: function() {
      this.game.physics.arcade.collide(this.bird,this.ground, this.deathHandler, null, this);

      this.pipes.forEach(function(pipeGroup) {
        this.checkScore(pipeGroup);
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
      }, this);

    },

    generatePipes:function(){
      var pipeY = this.game.rnd.integerInRange(-150, 150);
      var pipeGroup = this.pipes.getFirstExists(false);
      if(!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this.pipes);
      }
      pipeGroup.reset(this.game.width, pipeY);
    },

    checkScore: function(pipeGroup){
      if(pipeGroup.exists&& !pipeGroup.hasScored && pipeGroup.topPipe.world.x < this.bird.world.x){
        pipeGroup.hasScored = true;
        this.score++;
        this.scoreText.setText(this.score.toString());


      }
    },

    deathHandler: function() {
      this.game.state.start('gameover');
      //this.bird.alive=false;
      //this.pipes.callAll('stop');
      //this.pipeGenerator.timer.stop();
      //this.ground.stopScroll();

    },

    shutdown: function() {
      this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.bird.destroy();
      this.pipes.destroy();

    }
  };

  module.exports = Play;

},{"../prefabs/bird":2,"../prefabs/ground":3,"../prefabs/pipe":4,"../prefabs/pipeGroup":5}],11:[function(require,module,exports){

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

},{}]},{},[1])