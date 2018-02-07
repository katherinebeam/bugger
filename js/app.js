// Enemies our player must avoid
var Enemy = function(x, y) {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    // The Enemy's starting x position
    this.x = x;
    // The Enemy's starting y position
    this.y = y;
    // The Enemy's speed
    this.speed = 300;
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += dt * this.speed;
    this.render(this.x, this.y);
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draws an enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function Player() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 380;
    this.update = function() {
        this.render(this.x, this.y);
    }

    this.handleInput = function(keyPressed) {
        if(keyPressed==='right'&&this.x<400) {
            this.x += 45;
        } else if(keyPressed==='left'&&this.x>=0) {
            this.x -= 45;
        } else if(keyPressed==='up'&&this.y>=0) {
            this.y -= 40;
        } else if(keyPressed==='down'&&this.y<=415) {
            this.y += 40;
        }
        this.update();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Place all enemy objects in an array called allEnemies
const allEnemies = (function() {
    const enemies = [];
    for(let i = 0; i < 3; i++) {
        // Set the starting x and y position for each enemy
        // Each Enemy's x value is set to be offscreen at the start of the game
        const enemy = new Enemy(-100, i * 85 + 57);
        enemies.push(enemy);
    }
    return enemies;
}());

// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
