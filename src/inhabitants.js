class Inhabitants {
  constructor(initialPosition) {
    this.initialPosition = {
      x: parseInt(initialPosition[0]),
      y: parseInt(initialPosition[1]),
    };
    this.currentPosition = this.initialPosition;
  }
}

module.exports = Inhabitants;
