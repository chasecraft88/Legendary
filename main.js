// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create player object
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 2,
};

// Load images
const backgroundImg = new Image();
backgroundImg.src = 'https://raw.githubusercontent.com/chasecraft88/Legendary/2f031cc5b91efb878d1a1d3501a103e35bb5d573/assets/Img10.jpg';

const playerImg = new Image();
playerImg.src = 'https://raw.githubusercontent.com/chasecraft88/Legendary/2f031cc5b91efb878d1a1d3501a103e35bb5d573/assets/Img2.png';

// Draw images on the canvas
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background image
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // Draw the player image
    ctx.drawImage(playerImg, player.x, player.y, 64, 64); // Adjust the size as needed
}

// Update player position
function update() {
    // Move the player with arrow keys
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') {
            player.y -= player.speed;
        }
        if (event.key === 'ArrowDown') {
            player.y += player.speed;
        }
        if (event.key === 'ArrowLeft') {
            player.x -= player.speed;
        }
        if (event.key === 'ArrowRight') {
            player.x += player.speed;
        }

        // Redraw the canvas
        draw();
    });
}

// Initial draw
draw();

// Call update function
update();