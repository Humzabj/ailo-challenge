const Inhabitants = require("./inhabitants");

class Zombie extends Inhabitants {
  constructor(initialPosition) {
    super(initialPosition);
    this.score = 0;
    this.movesCompleted = false;
  }

  // Methods
  bite() {
    this.score++;
  }

  move(direction, area) {
    switch (direction.toLowerCase()) {
      case "u":
        if (this.currentPosition.y > 0) this.currentPosition.y--;
        else this.currentPosition.y = area - 1;
        break;
      case "d":
        this.currentPosition.y = (this.currentPosition.y + 1) % area;
        break;
      case "l":
        if (this.currentPosition.x > 0) this.currentPosition.x--;
        else this.currentPosition.x = area - 1;
        break;
      case "r":
        this.currentPosition.x = (this.currentPosition.x + 1) % area;
        break;
    }
  }
}

module.exports = Zombie;
