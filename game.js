const canvasModule = {
  gameContainer: document.getElementById("gameContainer"),
  canvas: document.getElementById("gameCanvas"),
  ctx: null,
};

const canvasBorderWidth = 5; // Width of the canvas border
const canvasBorderHeight = 5; // Height of the canvas border

canvasModule.setupCanvas = () => {
  canvasModule.ctx = canvasModule.canvas.getContext("2d");
  canvasModule.canvas.width = canvasModule.gameContainer.clientWidth;
  canvasModule.canvas.height = canvasModule.gameContainer.clientHeight;
};

canvasModule.setupCanvas();

const playerModule = {
  player: {
    x: 0,
    y: 0,
    radius: 20,
    velocityX: 0,
    accelerationX: 0.1,
  },

  setupPlayer: () => {
    playerModule.player.x = canvasModule.canvas.width / 2;
    playerModule.player.y = canvasModule.canvas.height - 30;
  },

  drawPlayer: () => {
    const player = playerModule.player;
    canvasModule.ctx.beginPath();
    canvasModule.ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    canvasModule.ctx.fillStyle = "blue";
    canvasModule.ctx.fill();
    canvasModule.ctx.closePath();
  },

  updatePlayer: () => {
    const player = playerModule.player;
    player.x += player.velocityX;
    player.velocityX += player.accelerationX;

    if (player.x - player.radius < canvasBorderWidth) {
      player.x = player.radius + canvasBorderWidth;
      player.velocityX = -player.velocityX;
    }
    if (player.x + player.radius > canvasModule.canvas.width - canvasBorderWidth) {
      player.x = canvasModule.canvas.width - player.radius - canvasBorderWidth;
      player.velocityX = -player.velocityX;
    }
  },
};

playerModule.setupPlayer();

const enemyModule = {
  enemies: [],

  colors: ["red", "green", "blue", "yellow"],

  createEnemy: () => {
    const enemy = {
      x: Math.random() * canvasModule.canvas.width,
      y: Math.random() * canvasModule.canvas.height,
      radius: 15,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1,
      color: enemyModule.colors[Math.floor(Math.random() * enemyModule.colors.length)],
    };

    if (enemy.x - enemy.radius < canvasBorderWidth) {
      enemy.x = enemy.radius + canvasBorderWidth;
    }
    if (enemy.x + enemy.radius > canvasModule.canvas.width - canvasBorderWidth) {
      enemy.x = canvasModule.canvas.width - enemy.radius - canvasBorderWidth;
    }
    if (enemy.y - enemy.radius < canvasBorderHeight) {
      enemy.y = enemy.radius + canvasBorderHeight;
    }
    if (enemy.y + enemy.radius > canvasModule.canvas.height - canvasBorderHeight) {
      enemy.y = canvasModule.canvas.height - enemy.radius - canvasBorderHeight;
    }

    enemyModule.enemies.push(enemy);
  },

  drawEnemies: () => {
    enemyModule.enemies.forEach((enemy) => {
      canvasModule.ctx.beginPath();
      canvasModule.ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
      canvasModule.ctx.fillStyle = enemy.color;
      canvasModule.ctx.fill();
      canvasModule.ctx.closePath();
    });
  },

  updateEnemies: () => {
    enemyModule.enemies.forEach((enemy, index) => {
      if (collisionModule.detectCollision(playerModule.player, enemy)) {
        playerModule.player.radius += 2;
        enemyModule.enemies.splice(index, 1);
      } else {
        enemy.x += enemy.dx;
        enemy.y += enemy.dy;
      }
    });
  },

  biggestEnemy: () => {
    let biggest = enemyModule.enemies[0];
    enemyModule.enemies.forEach((enemy) => {
      if (enemy.radius > biggest.radius) {
        biggest = enemy;
      }
    });
    return biggest;
  },
};

const collisionModule = {
  detectCollision: (obj1, obj2) => {
    const dx = obj2.x - obj1.x;
    const dy = obj2.y - obj1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < obj1.radius + obj2.radius;
  },
};

const gameModule = {
  isGameOver: false,
  winCondition: false,

  updateGame: () => {
    if (!gameModule.isGameOver) {
      canvasModule.ctx.clearRect(0, 0, canvasModule.canvas.width, canvasModule.canvas.height);

      canvasModule.ctx.beginPath();
      canvasModule.ctx.lineWidth = canvasBorderWidth;
      canvasModule.ctx.strokeStyle = "black";
      canvasModule.ctx.rect(
        canvasBorderWidth / 2,
        canvasBorderHeight / 2,
        canvasModule.canvas.width - canvasBorderWidth,
        canvasModule.canvas.height - canvasBorderHeight
      );
      canvasModule.ctx.stroke();
      canvasModule.ctx.closePath();

      playerModule.updatePlayer();
      playerModule.drawPlayer();

      if (Math.random() < 0.02) {
        enemyModule.createEnemy();
      }

      enemyModule.updateEnemies();
      enemyModule.drawEnemies();

      if (playerModule.player.radius > enemyModule.biggestEnemy().radius) {
        gameModule.isGameOver = true;
        gameModule.winCondition = true;
        gameModule.gameOver();
      }

      requestAnimationFrame(gameModule.updateGame);
    } else {
      if (gameModule.winCondition) {
        canvasModule.ctx.font = "24px Arial";
        canvasModule.ctx.fillStyle = "green";
        canvasModule.ctx.fillText("You Win!", canvasModule.canvas.width / 2 - 60, canvasModule.canvas.height / 2);
      } else {
        gameModule.gameOver();
        canvasModule.ctx.font = "20px Arial";
        canvasModule.ctx.fillStyle = "red";
        canvasModule.ctx.fillText("Game Over", canvasModule.canvas.width / 2 - 60, canvasModule.canvas.height / 2);
        canvasModule.ctx.fillText("Touch the screen to restart", canvasModule.canvas.width / 2 - 120, canvasModule.canvas.height / 2 + 30);
      }
    }
  },

  startGame: () => {
    gameModule.updateGame();
  },

  gameOver: () => {
    // Handle game over logic
  },

  restartGame: () => {
    // Reset game variables and restart the game
    playerModule.setupPlayer();
    enemyModule.enemies = [];
    playerModule.player.radius = 20;
    gameModule.isGameOver = false;
    gameModule.winCondition = false;
    gameModule.startGame();
  },
};

gameModule.startGame();

canvasModule.canvas.addEventListener("touchstart", function (event) {
  if (gameModule.isGameOver) {
    gameModule.restartGame();
  }
});
