class Play extends Phaser.Scene {
    constructor() {
      super("playScene")
    }
    
    preload() {
      //adding copyright free background music
      this.load.audio('backgroundMusic', './assets/lady-of-the-80s.mp3');       

    }


    create() {

      //tracking time for speed boost
      this.startTime = this.time.now

      this.starfield = this.add.tileSprite(0,0,640,480,"starfield").setOrigin(0,0)
      this.planet = this.add.tileSprite(0,50,640,480,"planet").setOrigin(0,0)
      this.asteroid = this.add.tileSprite(0,50,640,480,"asteroid").setOrigin(0,0)

      this.starfield.setAlpha(0.6)
      this.asteroid.setAlpha(0.6)

      this.planet.setAlpha(0.5)
      // green UI background
      this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
      // white borders
      this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
      this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
      this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
      this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)  
      this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, "rocket").setOrigin(0.5,0)
      // add spaceships (x3)
      this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, "spaceship", 0, 30).setOrigin(0, 0)
      this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, "spaceship", 0, 20).setOrigin(0,0)
      this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, "spaceship", 0, 10).setOrigin(0,0)
      this.ship04 = new Spaceship(this, game.config.width, borderUISize*2 + borderPadding*4, "spaceship2",0,40).setOrigin(0,0)

      this.ship04.moveSpeed += 1
      //console.log("new ship speed", this.ship04.moveSpeed)

      keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
      keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

      this.backgroundMusic = this.sound.add('backgroundMusic', { volume: 0.2, loop: true });
      this.backgroundMusic.play();


      this.timeLeft = game.settings.gameTimer / 1000; // Convert milliseconds to seconds      

      //keep track of score
      this.p1Score = 0

      let scoreConfig = {
        fontFamily: "Courier",
        fontSize: "28px",
        backgroundColor: "#F3B141",
        color: "#843605",
        align: "right",
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
      }
      this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

      this.gameOver = false


      let highScoreConfig = {
        fontFamily: "Courier",
        fontSize: "28px",
        backgroundColor: "#F3B141",
        color: "#843605",
        align: "right",
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 125      
      }
      
      this.highScoreText = this.add.text(game.config.width - borderUISize - borderPadding -30, borderUISize + borderPadding * 2, "HS: " + highScore, highScoreConfig).setOrigin(1,0)


      let fireTextConfig = {
        fontFamily: "Courier",
        fontSize: "28px",
        backgroundColor: "#F3B141",
        color: "#843605",
        align: "right",
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 75     
      }
      
      this.fireText = this.add.text(game.config.width/2 + borderUISize + borderPadding, borderUISize + borderPadding *2, "FIRE", fireTextConfig).setOrigin(1,0)



      scoreConfig.fixedWidth = 0
      this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to Restart or ← for Menu", scoreConfig).setOrigin(0.5)
        this.gameOver = true
      }, null, this)



      this.timeLeftText = this.add.text(game.config.width/2 - borderUISize - borderPadding, borderUISize + borderPadding * 2, this.timeLeft, scoreConfig).setOrigin(1, 0)



    }

    update() {


      if (!this.gameOver) {
        this.timeLeft = Math.max(0, (game.settings.gameTimer - (this.time.now - this.startTime)) / 1000);
        this.timeLeftText.text = this.timeLeft.toFixed(1);
    }

      const elapsedTime = this.time.now - this.startTime

      if (this.p1Score > highScore) {
        highScore = this.p1Score
        this.highScoreText.text = 'HS: ' + highScore
      }

      if (elapsedTime >= 30000 && elapsedTime < 30005) {
        // Increase spaceship speed after 30 seconds
        this.ship01.moveSpeed += 1
        this.ship02.moveSpeed += 1
        this.ship03.moveSpeed += 1
        this.ship04.moveSpeed += 1
        //console.log("space speed: ", this.ship01.moveSpeed)
    }

      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
        this.backgroundMusic.stop();
        this.scene.restart()
      }

      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.backgroundMusic.stop();
        this.scene.start("menuScene")
      }

      this.starfield.tilePositionX -= 5
      this.asteroid.tilePositionX -= 1.5

      this.planet.tilePositionX -= 0.1

      if (!this.gameOver) {
        this.p1Rocket.update()
        this.ship01.update()
        this.ship02.update()
        this.ship03.update()
        this.ship04.update()
      }

      // check collisions
      if (this.checkCollision(this.p1Rocket, this.ship04)) {
        this.p1Rocket.reset()
        this.shipExplode(this.ship04)
      }

      if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset()
        this.shipExplode(this.ship03)
      }
      if (this.checkCollision(this.p1Rocket, this.ship02)) {
        this.p1Rocket.reset()
        this.shipExplode(this.ship02)
      }
      if (this.checkCollision(this.p1Rocket, this.ship01)) {
        this.p1Rocket.reset()
        this.shipExplode(this.ship01)
      }
    }



    checkCollision(rocket, ship) {
      // simple AABB checking
      if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
        return true
      } else {
        return false
      }
    }



    shipExplode(ship) {
      // temporarily hide ship
      ship.alpha = 0
      //hide fire
      this.fireText.visible = false;
      // create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
      boom.anims.play('explode')             // play explode animation
      boom.on('animationcomplete', () => {   // callback after anim completes
        ship.reset()                         // reset ship position
        ship.alpha = 1                       // make ship visible again
        boom.destroy()                       // remove explosion sprite

        setTimeout(() => {
          this.fireText.visible = true
      }, 10)

      })
      

      this.p1Score += ship.points
      this.scoreLeft.text = this.p1Score

      let explosionSounds = ["explosion1", "explosion2", "explosion3", "explosion4"]

      let randomIndex = Math.floor(Math.random()*4)
      let randomExplosion = explosionSounds[randomIndex]

      this.sound.play(randomExplosion)


    }


  
}