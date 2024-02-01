class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene")
    }

    preload() {
      // load images/tile sprites
      this.load.audio("sfx-select", "./assets/sfx-select.wav")
      this.load.audio("sfx-shot", "./assets/sfx-shot.wav")
      //this.load.audio("sfx-explosion", "./assets/sfx-explosion.wav")

      this.load.audio("explosion1", "./assets/explosion1.wav")
      this.load.audio("explosion2", "./assets/explosion2.wav")
      this.load.audio("explosion3", "./assets/explosion3.wav")
      this.load.audio("explosion4", "./assets/explosion4.wav")

      this.load.image("spaceship2", "./assets/myship.png")
      this.load.image("rocket", "./assets/rocket.png")
      this.load.image("spaceship", "./assets/spaceship.png")
      this.load.image("starfield", "./assets/starfield.png")
      //adding parrallex scrolling, I'm just adding planets that move at different speeds to give a distance effect. I think this is parralex scrolling?
      this.load.image("asteroid", "./assets/asteroid.png")
      this.load.image("planet", "./assets/planet.png")

      this.load.image("title", "./assets/title.png")
      this.load.image("rocket_t", "./assets/rocket_t.png")

      this.load.spritesheet("explosion", "./assets/explosion.png", {
        frameWidth: 64,
        frameHeight: 32,
        startFrame: 0,
        endFrame: 9
      })
    }
    
    create() {

      this.rocket_t = this.add.tileSprite(0,50,640,480,"rocket_t").setOrigin(0,0)
      //animation configeration
      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0}),
        frameRate: 30
      })
      //this.add.text(20, 20, "Rocket Patrol Menu")
      //this.scene.start("playScene")
      let menuConfig = {
        fontFamily: "Comic Sans MS",
        fontSize: "35px",
        color: "#FFFFFF",
        align: "right",
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 0
      }


      this.title = this.add.tileSprite(0,0,640,480,"title").setOrigin(0,0)

      this.add.text(game.config.width/2, game.config.height/2+140, "Use ←→ arrows to move & (F) to fire",
      menuConfig).setOrigin(0.5)

      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding+160, "Press ← for Novice or → for Expert",
      menuConfig).setOrigin(0.5)  

      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
      //console.log("pressed")
    }

    update() {

      this.rocket_t.tilePositionX -= 2

      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //console.log("pressed")
        //easy mode
        game.settings = {
          spaceshipSpeed: 2,
          gameTimer: 60000
        }
        this.sound.play("sfx-select")
        this.scene.start("playScene")
      }

      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        //console.log("hard pressed")
        //hard mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 45000
        }
        this.sound.play("sfx-select")
        this.scene.start("playScene")
      }

    }
}