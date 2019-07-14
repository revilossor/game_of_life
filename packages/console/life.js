/* eslint-disable no-octal-escape */
const { CellularAutomata, Lifecycle } = require("revilossor-game-tilemap");

const width = 92;
const height = 53;

const tileset = ["[]", "  "];

const lifecycle = new Lifecycle(["[]"], ["  "], [3], [2, 3]);

const map = new CellularAutomata(width, height, tileset, lifecycle);

map.noise(0.2);

const log = () => {
  map.generate(1);
  console.log("\033c");
  console.log(map.toString());
};

log();
setInterval(log, 400);
/* es-lint-enable no-octal-escape */
