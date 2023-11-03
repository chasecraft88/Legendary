// Get the canvas and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define game objects
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    speed: 5,
};

// Load game images
const backgroundImg = new Image();
backgroundImg.src = "https://github.com/chasecraft88/Legendary/blob/2f031cc5b91efb878d1a1d3501a103e35bb5d573/assets/Img10.jpg";

const playerImg = new Image();
playerImg.src = "https://github.com/chasecraft88/Legendary/blob/2f031cc5b91efb878d1a1d3501a103e35bb5d573/assets/Img2.png";

// Game loop
function gameLoop() {
    requestAnimationFrame(gameLoop);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // Move the player
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
    if (leftPressed && player.x > 0) {
        player.x -= player.speed;
    }

    // Draw the player
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Handle keyboard input (same as before)

// Start the game loop
gameLoop();
