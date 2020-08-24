const Planet = require("./planet");
const Zombie = require("./zombies");
const Creature = require("./creatures");

describe("Planet Class", () => {
  const testInput = 4;
  test("Constructor works", () => {
    const planet = new Planet(testInput);
    expect(planet.area).toBe(4);
    expect(planet.grid).toStrictEqual([
      ["x", "x", "x", "x"],
      ["x", "x", "x", "x"],
      ["x", "x", "x", "x"],
      ["x", "x", "x", "x"],
    ]);
    expect(planet.zombies).toStrictEqual([]);
    expect(planet.creatures).toStrictEqual([]);
  });

  describe("Methods work", () => {
    describe("Initialize grid functions properly", () => {
      const planet = new Planet(testInput);
      test("Initialize grid function exists and returns a valid value", () => {
        expect(planet.initializeGrid(1)).toBeDefined();
      });
      test("Initialize grid functions with a valid integer input", () => {
        expect(planet.initializeGrid(3)).toStrictEqual([
          ["x", "x", "x"],
          ["x", "x", "x"],
          ["x", "x", "x"],
        ]);
        expect(planet.initializeGrid(1)).toStrictEqual([["x"]]);
      });
      test("Initialize grid functions with a '0' input", () => {
        expect(planet.initializeGrid(0)).toStrictEqual([]);
      });
    });
    describe("Initialize creature function add a Creature object to the creatures array", () => {
      const planet = new Planet(3);
      test("Initialize creature function adds a valid object", () => {
        planet.initializeCreature(["2", "1"]);
        expect(planet.creatures).toStrictEqual([new Creature(["2", "1"])]);
      });
      test("Initialize creature function to generate a console error", () => {
        planet.initializeCreature(["5", "1"]);
        expect(planet.creatures.length).toBe(1);
      });
    });
    describe("Initialize zombie function add a Zombie object to the zombies array", () => {
      const planet = new Planet(3);
      test("Initialize zombie function adds a valid object", () => {
        planet.initializeZombie(["2", "1"]);
        expect(planet.zombies).toStrictEqual([new Zombie(["2", "1"])]);
      });
      test("Initialize zombie function to generate a console error", () => {
        planet.initializeZombie(["5", "1"]);
        expect(planet.zombies.length).toBe(1);
      });
    });
    describe("Alter GGrid function updates the position of inhabitants correctly", () => {
      const planet = new Planet(3);
      planet.initializeZombie(["0", "0"]);
      planet.initializeZombie(["0", "1"]);
      planet.initializeCreature(["2", "2"]);
      test("The initialize zombie and creature methods trigger the function output correctly", () => {
        // The alterGrid() function is branched by intializeZombie and initializeCreature functions
        expect(planet.grid[0][0]).toBe("Z");
        expect(planet.grid[1][0]).toBe("Z");
        expect(planet.grid[2][2]).toBe("C");
      });
      test("The zombie.move method triggers the function output correctly", () => {
        // The alterGrid() function is branched by intializeZombie and initializeCreature functions
        planet.zombies[0].move("u", 3);
        planet.alterGrid();
        expect(planet.grid[2][0]).toBe("Z");
        planet.zombies[1].move("r", 3);
        planet.alterGrid();
        expect(planet.grid[1][1]).toBe("Z");
        planet.zombies[1].move("d", 3);
        planet.alterGrid();
        expect(planet.grid[2][1]).toBe("Z");
        planet.zombies[1].move("d", 3);
        planet.alterGrid();
        expect(planet.grid[0][1]).toBe("Z");
      });
    });
    describe("Zombies bite creatures when on same coordinates and score a point", () => {
      test("Zombie bites creature, scores a point and alters array", () => {
        const planet = new Planet(2);
        planet.initializeZombie(["0", "0"]);
        planet.initializeCreature(["0", "1"]);
        planet.zombies[0].move("d", 2);
        planet.alterGrid();
        planet.testBite(planet.zombies[0]);
        expect(planet.zombies[0].score).toBe(1);
        expect(planet.zombies.length).toBe(2);
        expect(planet.creatures.length).toBe(0);
      });
      test("Zombie doesn't score a point nor does it alter the arrays when not on a creature", () => {
        const planet = new Planet(2);
        planet.initializeZombie(["0", "0"]);
        planet.initializeCreature(["0", "1"]);
        planet.zombies[0].move("r", 2);
        planet.alterGrid();
        planet.testBite(planet.zombies[0]);
        expect(planet.zombies[0].score).toBe(0);
        expect(planet.zombies.length).toBe(1);
        expect(planet.creatures.length).toBe(1);
      });
    });
  });
});
