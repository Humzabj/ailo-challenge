const Inhabitants = require("./inhabitants.js");

class Creature extends Inhabitants {
  constructor(initialPosition) {
    super(initialPosition);
  }
}

module.exports = Creature;
