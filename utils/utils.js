const utilities = {
  // Splits a string based on content between braces
  splitByParanthesis(stringArg) {
    (array = []), (c = 0);
    stringArg
      .split(/([()])/)
      .filter(Boolean)
      .forEach((e) =>
        // Increase / decrease counter and push desired values to an array
        e == "("
          ? c++
          : e == ")"
          ? c--
          : c > 0
          ? array.push("(" + e + ")")
          : array.push(e)
      );
    return array;
  },

  // Strips a string of paranthesis and return two coordinates
  convertCoordinates(coordinates) {
    coordinates = coordinates.replace("(", "");
    coordinates = coordinates.replace(")", "");
    coordinates = coordinates.split(",");
    if (coordinates.length > 2) {
      console.error("Please use a 2 dimensional coordinate system i.e. [x,y]");
    }
    for (let i = 0; i < coordinates.length; i++) {
      coordinates[i] = parseInt(coordinates[i]);
    }
    return coordinates;
  },
  sanitizeInputs(inputs) {
    var allTestsPassFlag = true;
    if (inputs.size >= 0 && inputs.size < Number.MAX_SAFE_INTEGER) {
      inputs.zombiePositions.forEach((element) => {
        let position = utilities.convertCoordinates(element);
        if (
          position[0] >= inputs.size ||
          position[1] >= inputs.size ||
          position[0] < 0 ||
          position[1] < 0
        ) {
          console.error(
            "The starting position[" +
              element +
              "] of the zombie is out of the " +
              inputs.size +
              " x " +
              inputs.size +
              " field"
          );
          allTestsPassFlag = false;
        }
        // TODO: check if zombie starts on top of a creature
        // TODO: check if two zombies placed on the same coordinate
      });
      inputs.creaturePositions.forEach((element) => {
        let position = utilities.convertCoordinates(element);
        if (
          position[0] >= inputs.size ||
          position[1] >= inputs.size ||
          position[0] < 0 ||
          position[1] < 0
        ) {
          console.error(
            "The starting position[" +
              element +
              "] of the creature is out of the " +
              inputs.size +
              " x " +
              inputs.size +
              " field"
          );
          allTestsPassFlag = false;
        }
        // TODO: check if creature starts on top of a creature
        // TODO: check if two creatures placed on the same coordinate
        // TODO: check if creature is placed on the same coordinate as a zombie
      });
      for (let i = 0; i < inputs.moves.length; i++) {
        if (!inputs.moves[i].match("[UuDdLlRr]")) {
          console.error("The moves can only be 'u', 'd', 'l' or 'r'");
          allTestsPassFlag = false;
        }
      }
    } else {
      console.error(
        "The input area is an unsafe integer. Try something between 0 and " +
          Number.MAX_SAFE_INTEGER
      );
      allTestsPassFlag = false;
    }
    return allTestsPassFlag;
  },
};

module.exports = utilities;
