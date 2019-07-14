/* eslint-disable no-octal-escape */
const { CellularAutomata } = require("./dist");
const { Lifecycle } = require("./dist/CellularAutomata");

const width = 50;
const height = 50;

const tileset = ["\x1b[2m[ ]\x1b[0m", "\x1b[2m[\x1b[0mx\x1b[2m]\x1b[0m"];

const lifecycle = new Lifecycle(
  ["\x1b[2m[\x1b[0mx\x1b[2m]\x1b[0m"],
  ["\x1b[2m[ ]\x1b[0m"],
  [3],
  [2, 3]
);

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
