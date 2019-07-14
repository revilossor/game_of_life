/* eslint-disable no-octal-escape */
const { CellularAutomata, Lifecycle } = require("revilossor-game-tilemap");

const width = 92;
const height = 50;

const tileset = ["[]", "  "];

const lifecycle = new Lifecycle(["[]"], ["  "], [3], [1, 2, 3, 4, 5]);

const map = new CellularAutomata(width, height, tileset, lifecycle);

map.noise(0.1);

const log = () => {
  map.generate(1);
  console.log("\033c");
  console.log(map.toString());
};

log();
setInterval(log, 100);
/* es-lint-enable no-octal-escape */
