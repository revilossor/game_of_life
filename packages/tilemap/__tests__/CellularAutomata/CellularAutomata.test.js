const CellularAutomata = require("../../src/CellularAutomata").default;
const Tilemap = require("../../src/Tilemap").default;
const Lifecycle = require("../../src/CellularAutomata/Lifecycle").default;

const width = 3;
const height = 3;

const tileset = ["rock", "paper", "scissors"];

const lifecycle = new Lifecycle(["paper"], ["rock", "scissors"], [3], [2, 3]);

let map;

beforeEach(() => {
  map = new CellularAutomata(width, height, tileset, lifecycle);
});

it("extends Tilemap", () => {
  expect(map).toBeInstanceOf(Tilemap);
});

describe("constructor", () => {
  describe("assigns constructor values", () => {
    it("lifecycle", () => {
      expect(map.lifecycle).toBe(lifecycle);
    });
  });
});

describe("getNeighbours", () => {
  let neighbours;
  const source = [0, 1, 2, 0, 1, 2, 0, 1, 2];

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
