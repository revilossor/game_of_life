/* eslint-disable no-octal-escape */
const { AutomataTilemap, AutomationModel } = require("revilossor-game-tilemap");

const width = 50;
const height = 50;

const tileset = ["\x1b[2m[ ]\x1b[0m", "\x1b[2m[\x1b[0mx\x1b[2m]\x1b[0m"];

const model = new AutomationModel(
  ["\x1b[2m[\x1b[0mx\x1b[2m]\x1b[0m"],
  ["\x1b[2m[ ]\x1b[0m"],
  [],
  [3],
  [2, 3]
);

const map = new AutomataTilemap(width, height, tileset, model);

const source = new Array(width * height).fill(0);
source[1] = 1;
source[width + 2] = 1;
source[width * 2 + 0] = 1;
source[width * 2 + 1] = 1;
source[width * 2 + 2] = 1;

map.load(source);

const log = () => {
  map.generate(1);
  console.log("\033c");
  console.log(map.toString());
};

log();
setInterval(log, 200);
/* es-lint-enable no-octal-escape */
