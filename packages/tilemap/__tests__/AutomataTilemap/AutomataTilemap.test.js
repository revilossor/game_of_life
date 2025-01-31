const AutomataTilemap = require("../../src/AutomataTilemap").default;
const Tilemap = require("../../src/Tilemap").default;
const Tileset = require("../../src/Tileset").default;
const { AutomationModel } = require("../../src/AutomataTilemap");

const width = 3;
const height = 3;

const tileset = new Tileset("rock", "paper", "scissors");

const model = new AutomationModel(
  ["paper"],
  ["rock", "scissors"],
  [],
  [3],
  [2, 3]
);

let map;

beforeEach(() => {
  map = new AutomataTilemap(width, height, tileset, model);
});

it("extends Tilemap", () => {
  expect(map).toBeInstanceOf(Tilemap);
});

describe("constructor", () => {
  describe("assigns constructor values", () => {
    it("AutomationModel", () => {
      expect(map.model).toBe(model);
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
  const tiles = new Tileset("alive", "dead");
  beforeEach(() => {
    map = new AutomataTilemap(
      width,
      height,
      tiles,
      new AutomationModel(["alive"], ["dead"], [], [3], [2, 3])
    );
  });
  it("updates to the next generation for the AutomationModel", () => {
    expect(
      map
        .fromValues([
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
        .to2DValues()
    ).toEqual([
      ["dead", "dead", "dead"],
      ["dead", "dead", "dead"],
      ["dead", "dead", "dead"]
    ]);

    expect(
      map
        .fromValues([
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
        .toValues()
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
        .fromValues([
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
        .toValues()
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

  it("works if width and height arent the same", () => {
    map = new AutomataTilemap(
      4,
      2,
      tiles,
      new AutomationModel(["alive"], ["dead"], [], [3], [2, 3])
    );

    expect(
      map
        .load([0, 1, 0, 1, 1, 0, 1, 0])
        .step()
        .to2DValues()
    ).toEqual([
      ["dead", "alive", "alive", "dead"],
      ["dead", "alive", "alive", "dead"]
    ]);
  });

  it("is chainable", () => {
    const returned = map.step();
    expect(returned).toBeInstanceOf(AutomataTilemap);
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
    expect(returned).toBeInstanceOf(AutomataTilemap);
  });
});

describe("noise", () => {
  const countAlives = automata =>
    automata
      .save()
      .filter(
        item =>
          automata.model.live.indexOf(automata.tileset.getValue(item)) > -1
      ).length;

  describe("when no argument is passed", () => {
    beforeEach(() => {
      Math.floor = jest.fn(() => 0);
      map.noise();
    });

    it("sets each tile to a random index", () => {
      const length = width * height;
      expect(Math.floor).toHaveBeenCalledTimes(length);
      expect(map.save()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });

  describe("when a percent alive that isnt between 0 and 1 is passed", () => {
    it("throws", () => {
      const error = Error("expected a number between 0 and 1");
      expect.assertions(1);
      try {
        map.noise(12);
      } catch (err) {
        expect(err).toEqual(error);
      }
    });
  });

  describe("when a percent alive is passed", () => {
    beforeEach(() => {
      jest.spyOn(Math, "random");
    });
    it("there are the correct number of alive tiles", () => {
      expect(countAlives(map.noise(0.5))).toBe(5);
      expect(countAlives(map.noise(0.1))).toBe(1);
      expect(countAlives(map.noise(0.9))).toBe(8);
    });
  });
});
