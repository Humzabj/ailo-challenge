const Inhabitants = require("./inhabitants");

describe("Inhabitants Class", () => {
  test("Constructor works", () => {
    const inhabitants = new Inhabitants(["1", "2"]);
    expect(inhabitants.initialPosition.x).toBe(1);
    expect(inhabitants.initialPosition.y).toBe(2);
    expect(inhabitants.currentPosition.x).toBe(1);
    expect(inhabitants.currentPosition.y).toBe(2);
  });
});
