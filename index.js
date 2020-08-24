const Planet = require("./src/planet.js");
const utilities = require("./utils/utils");

// Read a file
if (process.argv.length < 3) {
  console.error("Usage: npm run program FILEPATH[.txt or .json]");
} else if (process.argv.length === 2) {
  console.error("Please pass the file path as an argument");
} else {
  // Read the file and print its contents.
  let filename = process.argv[2];
  if (filename.includes(".txt")) {
    var lineReader = require("readline").createInterface({
      input: require("fs").createReadStream(filename),
    });
    const inputs = {
      size: 0,
      zombiePositions: [],
      creaturePositions: [],
      moves: "",
    };
    let lineCount = 0;
    lineReader.on("line", (line) => {
      if (lineCount === 0) inputs["size"] = parseInt(line);
      if (lineCount === 1)
        inputs["zombiePositions"] = utilities.splitByParanthesis(line);
      if (lineCount === 2)
        inputs["creaturePositions"] = utilities.splitByParanthesis(line);
      if (lineCount === 3) {
        inputs["moves"] = line;
        if (utilities.sanitizeInputs(inputs)) initializeGame(inputs);
      }
      lineCount++;
    });
  } else if (filename.includes(".json")) {
    const data = require(filename);
    if (utilities.sanitizeInputs(data)) initializeGame(data);
  } else {
    console.error("file format not supported");
  }

  function initializeGame(inputs) {
    const field = new Planet(parseInt(inputs["size"]));

    // Fetch zombie initial positions
    let zombieInitialPositions = inputs["zombiePositions"];
    zombieInitialPositions.forEach((element) => {
      field.initializeZombie(utilities.convertCoordinates(element));
    });

    // Fetch creatures initial positions
    let creatureInitialPositions = inputs["creaturePositions"];
    creatureInitialPositions.forEach((element) => {
      field.initializeCreature(utilities.convertCoordinates(element));
    });

    // Load move commands
    field.alterGrid();
    startGame(field, inputs["moves"]);
  }

  function startGame(field, moves) {
    for (let j = 0; j < field.zombies.length; j++) {
      let zombie = field.zombies[j];
      if (!zombie.movesCompleted) {
        for (let i = 0; i < moves.length; i++) {
          zombie.move(moves[i], field.area);
          let bitten = field.testBite(zombie);
          field.alterGrid();
          if (i === moves.length) {
            zombie.movesCompleted = true;
            j = 0;
          }
        }
      }
    }
    field.printPlanet();
    // field.zombies.forEach((zombie) => {

    // });
  }

  // Test for multiple creatures on the same spot
  //  Test for Zombie on Creature in starting
}
