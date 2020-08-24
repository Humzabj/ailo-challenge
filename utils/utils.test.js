const utilities = require("./utils");

describe("Testing utilities", () => {
  describe("splitByParanthesis method", () => {
    test("is defined", () => {
      expect(utilities.splitByParanthesis("(0,1)")).toBeDefined();
    });
    test("Properly formed input results in separated arrays", () => {
      const input = "(0,1)(1,2)";
      expect(utilities.splitByParanthesis(input)).toStrictEqual([
        "(0,1)",
        "(1,2)",
      ]);
    });
    test("Malformed input results in correctly separated arrays", () => {
      const input = "(((0,1)(1,2)((3,1))";
      expect(utilities.splitByParanthesis(input)).toStrictEqual([
        "(0,1)",
        "(1,2)",
        "(3,1)",
      ]);
    });
  });
  describe("converCoordinates method", () => {
    test("Returns coordinates as an array", () => {
      const input = "(1,2)";
      expect(utilities.convertCoordinates(input)).toStrictEqual([1, 2]);
    });
  });
  describe("sanitizeInputs method", () => {
    var input = {
      size: 4,
      zombiePositions: ["(2,1)"],
      creaturePositions: ["(0,1)", "(1,2)", "(3,1)"],
      moves: "DLUURR",
    };
    test("method returns true on correctly formatted input", () => {
      expect(utilities.sanitizeInputs(input)).toBeTruthy();
    });
    test("method returns false on out of bound indexes for creatures", () => {
      input.creaturePositions = ["(0,1)", "(1,2)", "(4,1)"];
      expect(utilities.sanitizeInputs(input)).toBeFalsy();
    });
    input.creaturePositions = ["(0,1)", "(1,2)", "(3,1)"];
    test("method returns false on out of bound indexes for zombies", () => {
      input.zombies = ["(2,4)"];
      expect(utilities.sanitizeInputs(input)).toBeFalsy();
    });
    input.zombies = ["(2,1)"];
    test("method returns false on unexpected moves identifier", () => {
      input.moves = "PPDDLLUIO";
      expect(utilities.sanitizeInputs(input)).toBeFalsy();
    });
  });
});
