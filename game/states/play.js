
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
