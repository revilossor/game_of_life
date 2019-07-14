/* eslint-disable no-octal-escape */
const { CellularAutomata, Lifecycle } = require("revilossor-game-tilemap");

const width = 50;
const height = 50;

const tileset = ["\x1b[2m[ ]\x1b[0m", "\x1b[2m[\x1b[0mx\x1b[2m]\x1b[0m"];

const lifecycle = new Lifecycle(
  ["\x1b[2m[\x1b[0mx\x1b[2m]\x1b[0m"],
  ["\x1b[2m[ ]\x1b[0m"],
  [4, 5, 6, 7, 8],
  [3]
);

const map = new CellularAutomata(width, height, tileset, lifecycle);

map.noise(0.3);

const log = () => {
  map.generate(1);
  console.log("\033c");
  console.log(map.toString());
};

log();
setInterval(log, 500);
/* es-lint-enable no-octal-escape */
