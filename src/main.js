// Acer Cristea
// Rocket Patrol Mods (I know so creative)
// 12-13 hours ish
// Track a high score that persists across scenes and display it in the UI (1)
// Implement the 'FIRE' UI text from the original game (1)
// Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
// Implement the speed increase that happens after 30 seconds in the original game (1) I'm not sure how it works in the orginal game, there wasn't a great video either. Hopefully what I did is fine
// Create 4 new explosion sound effects and randomize which one plays on impact (3)
// Display the time remaining (in seconds) on the screen (3)
// Create a new title screen (e.g., new artwork, typography, layout) (3)
// Implement parallax scrolling for the background (3)
// Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}




let game = new Phaser.Game(config)

let keyFIRE, keyRESET, keyLEFT, keyRIGHT

let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let highScore = 0;
