// New entity parentclass from which both subclasses will inherit methods
class Entity {
  constructor() {
    this.sprite = "images/";
    this.x = 2;
    this.y = 5;
  }

  // Method allowing player to stay in the board game dimensions
  update(dt) {
    this.isOutOfBoundsX = this.x > 5;
    this.isOutOfBoundsY = this.y < 1;
  }

  // Checking for a collision between the player and the enemy
  checkCollisions(playerOrEnemy) {
    if (this.y === playerOrEnemy.y) {
      if (this.x >= playerOrEnemy.x - 0.7 && this.x <= playerOrEnemy.x + 0.7) {
        return true;
      }
    } else {
      return false;
    }
  }

  // Draws the sprite on the board
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }
}

// Player is a subclass on Entity
class Player extends Entity {
  constructor() {
    super();
    this.sprite += "char-boy.png";
    this.moving = false;
    this.win = false;
    this.dead = false;
    this.lives = 5;
  }

  loseLife() {
    // Only decrement when greater than zero
    if (this.lives > 0) {
      this.lives--; // decrement lives
      const lives = document.querySelectorAll(".lives img"); // Get the life meter
      lives[this.lives].classList.toggle("hide"); // Remove one life on screen
    }
  }
  // Resets the player back to the starting location on the game board
  reset() {
    this.x = 2;
    this.y = 5;
  }

  // Method ending game and opening modal
  update(dt) {
    super.update();
    if (this.lives === 0 && !this.dead) {
      this.dead = true;
      this.reset();

      openModal();
      resetGame();
    }
  }

  checkWin(dt) {
    super.update();
    if(this.isOutOfBoundsY && !this.moving && !this.win) {
      alert("Congratulations you've won!");
      this.win = true;

      location.reload();
    }
  }

  render() {
    super.render();
    this.moving = false;
  }

  // Controls user input to move player
  handleInput(input) {
    switch (input) {
      case "left":
        this.x = this.x > 0 ? this.x - 1 : this.x;
        break;
      case "up":
        this.y = this.y > 0 ? this.y - 1 : this.y;
        break;
      case "right":
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case "down":
        this.y = this.y < 5 ? this.y + 1 : this.y;
        break;
      default:
        break;
    }
    this.moving = true;
  }
}

// Enemy is a subclass on Entity
class Enemy extends Entity {
  constructor(x, y) {
    super();
    this.sprite += "enemy-bug.png";
    this.x = x;
    this.y = y;
    this.speed = 1 + Math.random() * 3;
  }

  // Changin the pace of the Enemy
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > 5) {
      this.x = -1;
    }
  }
}

// New Parent Class for the items on the board
class Items {
  constructor(sprite, x, y) {
    this.sprite = "images/";
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }
}

// Subclass of the Items Class
class Gem extends Items {
  constructor(x, y, sprite) {
    super();
    this.sprite += sprite;
    this.x = Math.floor(Math.random() * 5);
    this.y = Math.floor(Math.random() * 4 + 1);
  }

  // Checking for a collision between the player and the Gem stones on the board
  collectItems(playerOrGem) {
    if (this.y === playerOrGem.y) {
      if (this.x >= playerOrGem.x - 0.5 && this.x <= playerOrGem.x + 0.5) {
        return true;
      } else {
        return false;
      }
    }
  }

  render() {
    super.render();
  }
}
