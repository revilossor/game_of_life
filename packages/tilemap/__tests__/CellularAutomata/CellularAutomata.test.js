const CellularAutomata = require("../../src/CellularAutomata").default;
const Tilemap = require("../../src/Tilemap").default;

const width = 3;
const height = 3;

const tileset = ["rock", "paper", "scissors"];
const source = [0, 1, 2, 0, 1, 2, 0, 1, 2];

let map;

beforeEach(() => {
  map = new CellularAutomata(width, height, tileset);
});

it("extends Tilemap", () => {
  expect(map).toBeInstanceOf(Tilemap);
});

describe("getNeighbours", () => {
  let neighbours;

  beforeEach(() => {
    map.load(source);
  });

  it("returns the correct neighbours object", () => {
    neighbours = map.getNeighbours(1, 1);
    expect(neighbours.topLeft).toBe(0);
    expect(neighbours.top).toBe(1);
    expect(neighbours.topRight).toBe(2);
    expect(neighbours.left).toBe(0);
    expect(neighbours.right).toBe(2);
    expect(neighbours.bottomLeft).toBe(0);
    expect(neighbours.bottom).toBe(1);
    expect(neighbours.bottomRight).toBe(2);
  });

  it("off map edges are null", () => {
    neighbours = map.getNeighbours(0, 0);
    expect(neighbours.topLeft).toBeNull();
    expect(neighbours.top).toBeNull();
    expect(neighbours.topRight).toBeNull();
    expect(neighbours.left).toBeNull();
    expect(neighbours.right).toBe(1);
    expect(neighbours.bottomLeft).toBeNull();
    expect(neighbours.bottom).toBe(0);
    expect(neighbours.bottomRight).toBe(1);
  });
});
