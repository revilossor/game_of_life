const AutomataTilemap = require("../../src/AutomataTilemap").default;
const { AutomationModel } = require("../../src/AutomataTilemap");

const width = 10;
const height = 10;

const tileset = ["[ ]", "[x]"];

const model = new AutomationModel(["[x]"], ["[ ]"], [], [3], [2, 3]);

let map;

const source = new Array(width * height).fill(0);
source[34] = 1;
source[43] = 1;
source[44] = 1;
source[55] = 1;

beforeAll(() => {
  map = new AutomataTilemap(width, height, tileset, model);
  map.load(source);
});

afterEach(() => {
  map.generate(1);
});

it("first generation", () => {
  expect(map.toString()).toEqual(`
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][x][ ][ ][ ][ ][ ]
[ ][ ][ ][x][x][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][x][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
`);
});

it("second generation", () => {
  expect(map.toString()).toEqual(`
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][x][x][ ][ ][ ][ ][ ]
[ ][ ][ ][x][x][x][ ][ ][ ][ ]
[ ][ ][ ][ ][x][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
`);
});

it("third generation", () => {
  expect(map.toString()).toEqual(`
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][x][ ][x][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][x][ ][ ][ ][ ]
[ ][ ][ ][x][x][x][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
`);
});

it("fourth generation", () => {
  expect(map.toString()).toEqual(`
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][x][ ][ ][ ][ ][ ]
[ ][ ][ ][x][ ][x][x][ ][ ][ ]
[ ][ ][ ][ ][x][x][ ][ ][ ][ ]
[ ][ ][ ][ ][x][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
`);
});

it("fifth generation", () => {
  expect(map.toString()).toEqual(`
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][x][x][ ][ ][ ][ ]
[ ][ ][ ][x][ ][ ][x][ ][ ][ ]
[ ][ ][ ][x][ ][ ][x][ ][ ][ ]
[ ][ ][ ][ ][x][x][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
[ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
`);
});
