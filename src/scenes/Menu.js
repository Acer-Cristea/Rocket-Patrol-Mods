class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene")
    }

    preload() {
      // load images/tile sprites
      this.load.audio("sfx-select", "./assets/sfx-select.wav")
      this.load.audio("sfx-shot", "./assets/sfx-shot.wav")
      this.load.audio("sfx-explosion", "./assets/sfx-explosion.wav")
      this.load.image("rocket", "./assets/rocket.png")
      this.load.image("spaceship", "./assets/spaceship.png")
      this.load.image("starfield", "./assets/starfield.png")
      this.load.spritesheet("explosion", "./assets/explosion.png", {
        frameWidth: 64,
        frameHeight: 32,
        startFrame: 0,
        endFrame: 9
      })
    }
    
    create() {

      //animation configeration
      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
        frameRate: 30
      })
      //this.add.text(20, 20, "Rocket Patrol Menu")
      //this.scene.start("playScene")

      let menuConfig = {
        fontFamily: "Courier",
        fontSize: "28px",
        backgroundColor: "#F3B141",
        color: "#843605",
        align: "right",
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0
      }

      //displays menu text
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "ROCKET PATROL",
      menuConfig).setOrigin(0.5)
      this.add.text(game.config.width/2, game.config.height/2, "Use ←→ arrows to move & (F) to fire",
      menuConfig).setOrigin(0.5)

      menuConfig.backgroundColor = "#00FF00"
      menuConfig.color = "#000"

      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, "Press ← for Novice or → for Expert",
      menuConfig).setOrigin(0.5)  

      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
      //console.log("pressed")
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //console.log("pressed")
        //easy mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000
        }
        this.sound.play("sfx-select")
        this.scene.start("playScene")
      }

      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        //console.log("hard pressed")
        //hard mode
        game.settings = {
          spaceshipSpeed: 4,
          gameTimer: 1000 //45000
        }
        this.sound.play("sfx-select")
        this.scene.start("playScene")
      }

    }
}