const Zombie = require("./zombies.js");
const Creature = require("./creatures.js");

class Planet {
  constructor(area) {
    this.area = area;
    this.grid = this.initializeGrid(area);
    // Creat arrays of creatures and zombies here.
    this.zombies = [];
    this.creatures = [];
  }

  // Methods
  initializeGrid(area) {
    return new Array(area).fill("x").map(() => new Array(area).fill("x"));
  }

  // Input: x,y
  initializeZombie(startingPostion) {
    if (startingPostion[0] < this.area && startingPostion[1] < this.area) {
      this.zombies.push(new Zombie(startingPostion));
      this.alterGrid();
    } else
      console.error("The starting position of the zombie exceeds the map area");
  }

  // Input: x,y
  initializeCreature(startingPostion) {
    if (startingPostion[0] < this.area && startingPostion[1] < this.area) {
      this.creatures.push(new Creature(startingPostion));
      this.alterGrid();
    } else
      console.error("The starting position of the zombie exceeds the map area");
  }

  // type is either 'C' (creature) or 'Z' (zombie)
  // * Do we even need this function?
  alterGrid() {
    this.grid = this.initializeGrid(this.area);
    this.zombies.forEach((zombie) => {
      this.grid[zombie.currentPosition.y][zombie.currentPosition.x] = "Z";
    });
    this.creatures.forEach((creature) => {
      this.grid[creature.initialPosition.y][creature.initialPosition.x] = "C";
    });
  }

  testBite(zombie) {
    this.creatures.forEach((creature, i) => {
      if (
        creature.initialPosition.y === zombie.currentPosition.y &&
        creature.initialPosition.x === zombie.currentPosition.x
      ) {
        zombie.bite();
        // Converting creature
        this.initializeZombie([
          creature.initialPosition.x,
          creature.initialPosition.y,
        ]);
        // Remove creature from creatures array
        this.creatures.splice(i, 1);
      }
    });
  }

  printPlanet() {
    let totalScore = 0;
    let zombiePositions = "";
    this.zombies.forEach((zombie) => {
      if (zombie.score > 0) totalScore += zombie.score;
      zombiePositions +=
        "(" + zombie.currentPosition.x + "," + zombie.currentPosition.y + ") ";
    });
    console.log("zombies score: " + totalScore);
    console.log("zombies positions: \n" + zombiePositions);
    console.log("survivor(s): \n" + this.creatures.length);
  }
}

module.exports = Planet;
