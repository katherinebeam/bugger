// Enemies our player must avoid
var Enemy = function(x, y) {
    // constant - width of enemy sprite
    this.WIDTH = 97;
    // constant - height of enemy sprite
    this.HEIGHT = 66;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    // The Enemy's starting x position. Each Enemy should be offscreen at the start of the game.
    this.x = x;
    // The Enemy's starting y position
    this.y = y;
    // The Enemy's starting speed
    this.speed = this.changeSpeed();
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 500) {
        this.x += dt * this.speed;
    } else {
        this.changeSpeed();
        this.x = -100;
    }
    this.render(this.x, this.y);
};

// Changes the speed of each Enemy each time it moves across the page
Enemy.prototype.changeSpeed = function() {
    this.speed = Math.floor(Math.random() * (700 - 300 + 1)) + 300;
}

// Draws an enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function Player() {
    // constant - width of sprite
    this.WIDTH = 74;
    // constant - height of sprite
    this.HEIGHT = 89;
    this.sprite = 'images/char-princess-girl.png';
    // starting x position of Player
    this.x = 215;
    // starting y position of Player
    this.y = 450;
    // Player starts off alive
    this.dead = false;
    // Player starts off not having won
    this.won = false;
}

// Updates the player's position on the canvas
Player.prototype.update = function() {
    this.render(this.x, this.y);
}

// Updates the character's x or y coordinate property based on the key the player pressed
Player.prototype.handleInput = function(keyPressed) {
    if(keyPressed === 'right' && this.x < 400) {
        this.x += 45;
    } else if(keyPressed === 'left' && this.x >= 0) {
        this.x -= 45;
    } else if(keyPressed === 'up' && this.y >=40) {
        this.y -= 40;
    } else if(keyPressed === 'down' && this.y <= 415) {
        this.y += 40;
    }
    this.update();
}

// Displays the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Array of the game's Enemy objects
const allEnemies = (function() {
    const enemies = [];
    for(let i = 0; i < 3; i++) {
        // Set the starting x & y position for each enemy
        const enemy = new Enemy(-i * 20, i * 89 + 125);
        enemies.push(enemy);
    }
    return enemies;
}());

// The game's player object
const player = new Player();

// This listens for key presses and sends the keys to the
// Player.handleInput() method
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
