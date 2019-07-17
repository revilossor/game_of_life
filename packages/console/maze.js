/* eslint-disable no-octal-escape */
const {
  CellularAutomata,
  CellularAutomationModel
} = require("revilossor-game-tilemap");

const width = 92;
const height = 52;

const tileset = ["[]", "  "];

const model = new CellularAutomationModel(
  ["[]"],
  ["  "],
  [],
  [3],
  [1, 2, 3, 4, 5]
);

const map = new CellularAutomata(width, height, tileset, model);

map.noise(0.1);

const log = () => {
  map.generate(1);
  console.log("\033c");
  console.log(map.toString());
};

log();
setInterval(log, 100);
/* es-lint-enable no-octal-escape */
