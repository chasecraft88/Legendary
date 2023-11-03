// Initialize Phaser
const gameConfig = {
    type: Phaser.AUTO,
    width: 800, // Adjust the width as needed for your game
    height: 600, // Adjust the height as needed for your game
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(gameConfig);

let player;

function preload() {
    // Preload game assets
    this.load.image('background', 'assets/Img1.jpg');
    this.load.image('player', 'assets/Img2.jpg');
}

function create() {
    // Create game objects
    this.add.image(400, 300, 'background'); // Display the background image
    player = this.physics.add.sprite(400, 300, 'player'); // Create a player sprite

    // Set up physics
    this.physics.world.setBounds(0, 0, 800, 600);
    player.setCollideWorldBounds(true);

    // Enable touch input for player movement
    this.input.on('pointerdown', function (pointer) {
        // Move the player sprite to the pointer's position
        this.physics.moveTo(player, pointer.x, pointer.y, 200);
    }, this);
}

function update() {
    // Implement your game logic and behavior in the update function

    // Example: Rotate the player sprite
    player.angle += 1;

    // Example: Check for game over conditions
    if (player.angle >= 360) {
        // Reset the player's rotation
        player.angle = 0;
    }
}