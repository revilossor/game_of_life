/* eslint-disable no-octal-escape */
const { AutomataTilemap, AutomationModel } = require("revilossor-game-tilemap");

const width = 92;
const height = 50;

const tileset = ["[]", "  "];

const model = new AutomationModel(["[]"], ["  "], [], [3], [4, 5, 6, 7, 8]);

const map = new AutomataTilemap(width, height, tileset, model);

map.noise(0.15);

const log = () => {
  map.generate(1);
  console.log("\033c");
  console.log(map.toString());
};

log();
setInterval(log, 150);
/* es-lint-enable no-octal-escape */
