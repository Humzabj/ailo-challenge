const Zombie = require("./zombies");

describe("Testing the zombie class constructor and methods", () => {
  describe("Constructor must work properly", () => {
    const zombie = new Zombie(["1", "2"]);
    test("Constructor initializes all class variables", () => {
      expect(zombie.initialPosition.x).toBe(1);
      expect(zombie.initialPosition.y).toBe(2);
      expect(zombie.currentPosition.x).toBe(1);
      expect(zombie.currentPosition.y).toBe(2);
      expect(zombie.score).toBe(0);
    });
  });

  describe("Class methods work", () => {
    test("Bite method", () => {
      const zombie = new Zombie(["1", "2"]);
      zombie.bite();
      expect(zombie.score).toBe(1);
    });

    describe("Moving a zombie", () => {
      describe("Moving up", () => {
        test("Move up", () => {
          const zombie = new Zombie(["1", "2"]);
          zombie.move("u", 4);
          expect(zombie.currentPosition.y).toBe(1);
        });
        test("Move up through field", () => {
          const zombie = new Zombie(["1", "0"]);
          zombie.move("u", 4);
          expect(zombie.currentPosition.y).toBe(3);
        });
      });
      describe("Moving down", () => {
        test("Move down", () => {
          const zombie = new Zombie(["1", "2"]);
          zombie.move("d", 4);
          expect(zombie.currentPosition.y).toBe(3);
        });
        test("Move down through field", () => {
          const zombie = new Zombie(["1", "3"]);
          zombie.move("d", 4);
          expect(zombie.currentPosition.y).toBe(0);
        });
      });
      describe("Moving left", () => {
        test("Move left", () => {
          const zombie = new Zombie(["1", "2"]);
          zombie.move("l", 4);
          expect(zombie.currentPosition.x).toBe(0);
        });
        test("Move left through field", () => {
          const zombie = new Zombie(["0", "0"]);
          zombie.move("l", 4);
          expect(zombie.currentPosition.x).toBe(3);
        });
      });
      describe("Moving right", () => {
        test("Move right", () => {
          const zombie = new Zombie(["1", "2"]);
          zombie.move("r", 4);
          expect(zombie.currentPosition.x).toBe(2);
        });
        test("Move right through field", () => {
          const zombie = new Zombie(["3", "0"]);
          zombie.move("r", 4);
          expect(zombie.currentPosition.x).toBe(0);
        });
      });
    });
  });
});
