const Creature = require("./creatures");

describe("Creature Class", () => {
  test("Constructor works", () => {
    const creature = new Creature(["1", "2"]);
    expect(creature.initialPosition.x).toBe(1);
    expect(creature.initialPosition.y).toBe(2);
  });
});
