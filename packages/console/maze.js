/* eslint-disable no-octal-escape */
const { AutomataTilemap, AutomationModel } = require("revilossor-game-tilemap");

const width = 92;
const height = 52;

const tileset = ["[]", "  "];

const model = new AutomationModel(["[]"], ["  "], [], [3], [1, 2, 3, 4, 5]);

const map = new AutomataTilemap(width, height, tileset, model);

map.noise(0.1);

const log = () => {
  map.generate(1);
  console.log("\033c");
  console.log(map.toString());
};

log();
setInterval(log, 100);
/* es-lint-enable no-octal-escape */
