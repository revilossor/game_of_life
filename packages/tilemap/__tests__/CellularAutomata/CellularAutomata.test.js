const { CellularAutomata, Tilemap } = require("../../src");
const { Lifecycle } = require("../../src/CellularAutomata");

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
    expect(neighbours.topLeft).toBe("rock");
    expect(neighbours.top).toBe("paper");
    expect(neighbours.topRight).toBe("scissors");
    expect(neighbours.left).toBe("rock");
    expect(neighbours.right).toBe("scissors");
    expect(neighbours.bottomLeft).toBe("rock");
    expect(neighbours.bottom).toBe("paper");
    expect(neighbours.bottomRight).toBe("scissors");
  });

  it("off map edges are null", () => {
    neighbours = map.getNeighbours(0, 0);
    expect(neighbours.topLeft).toBeNull();
    expect(neighbours.top).toBeNull();
    expect(neighbours.topRight).toBeNull();
    expect(neighbours.left).toBeNull();
    expect(neighbours.right).toBe("paper");
    expect(neighbours.bottomLeft).toBeNull();
    expect(neighbours.bottom).toBe("rock");
    expect(neighbours.bottomRight).toBe("paper");
  });
});

describe("step", () => {
  const tiles = ["alive", "dead"];
  beforeEach(() => {
    map = new CellularAutomata(
      width,
      height,
      tiles,
      new Lifecycle(["alive"], ["dead"], [3], [2, 3])
    );
  });
  it("updates to the next generation for the lifecycle", () => {
    expect(
      map
        .fromArray([
          "dead",
          "dead",
          "dead",
          "dead",
          "dead",
          "dead",
          "dead",
          "dead",
          "dead"
        ])
        .step()
        .to2DArray()
    ).toEqual([
      ["dead", "dead", "dead"],
      ["dead", "dead", "dead"],
      ["dead", "dead", "dead"]
    ]);

    expect(
      map
        .fromArray([
          "alive",
          "dead",
          "alive",
          "dead",
          "alive",
          "dead",
          "alive",
          "dead",
          "alive"
        ])
        .step()
        .toArray()
    ).toEqual([
      "dead",
      "alive",
      "dead",
      "alive",
      "dead",
      "alive",
      "dead",
      "alive",
      "dead"
    ]);

    expect(
      map
        .fromArray([
          "alive",
          "alive",
          "dead",
          "alive",
          "dead",
          "dead",
          "dead",
          "dead",
          "dead"
        ])
        .step()
        .toArray()
    ).toEqual([
      "alive",
      "alive",
      "dead",
      "alive",
      "alive",
      "dead",
      "dead",
      "dead",
      "dead"
    ]);
  });

  it("is chainable", () => {
    const returned = map.step();
    expect(returned).toBeInstanceOf(CellularAutomata);
  });
});

describe("generate", () => {
  it("steps the number of generations forward", () => {
    const generations = 4;
    const step = jest.spyOn(map, "step").mockImplementation(() => {});
    expect(step).not.toHaveBeenCalled();
    map.generate(generations);
    expect(step).toHaveBeenCalledTimes(generations);
  });

  it("is chainable", () => {
    const returned = map.generate(1);
    expect(returned).toBeInstanceOf(CellularAutomata);
  });
});

describe("noise", () => {
  beforeEach(() => {
    Math.random = jest.fn();
    Math.floor = () => 0;
    map.noise();
  });
  it("sets each tile to a random index", () => {
    expect(Math.random).toHaveBeenCalledTimes(width * height);
    const tiles = map.save();
    expect(tiles).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
