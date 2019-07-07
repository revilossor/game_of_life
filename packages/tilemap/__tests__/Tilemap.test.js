const { PointMap } = require("revilossor-game-common");

const { Tilemap } = require("../src");

const width = 3;
const height = 3;

const expectedLength = width * height;

const tileset = ["rock", "paper", "scissors"];
const source = [0, 1, 2, null, null, null, 0, 1, 2];

const x = 1;
const y = 2;

let map;

beforeEach(() => {
  map = new Tilemap(width, height, tileset);
});

describe("constructor", () => {
  describe("assigns constructor values", () => {
    it("width", () => {
      expect(map.width).toBe(width);
    });
    it("height", () => {
      expect(map.height).toBe(width);
    });
    it("tileset", () => {
      expect(map.tileset).toBe(tileset);
    });
  });

  it("initialises an empty level", () => {
    const emptyPointMap = new PointMap();
    expect(map.tiles).toEqual(emptyPointMap);
  });
});

describe("validatePoint", () => {
  let error;

  it("throws if the x index is invalid", () => {
    error = Error(`the x coordinate should be a number between 0 and ${width}`);
    expect(() => map.validatePoint("poo", y)).toThrow(error);
    expect(() => map.validatePoint(x + 100, y)).toThrow(error);
    expect(() => map.validatePoint(-x, y)).toThrow(error);
    expect(() => map.validatePoint()).toThrow(error);
  });

  it("throws if the y index is invalid", () => {
    error = Error(
      `the y coordinate should be a number between 0 and ${height}`
    );
    expect(() => map.validatePoint(x, "poo")).toThrow(error);
    expect(() => map.validatePoint(x, y + 100)).toThrow(error);
    expect(() => map.validatePoint(x, -y)).toThrow(error);
    expect(() => map.validatePoint(x)).toThrow(error);
  });

  it("doesnt throw if the coordinates are valid", () => {
    expect(() => map.validatePoint(x, y)).not.toThrow(error);
  });
});

describe("validateTileIndex", () => {
  const error = Error(
    `the tile index should be a number between 0 and ${tileset.length}`
  );

  it("throws if the index isnt a number", () => {
    expect(() => map.validateTileIndex("poo")).toThrow(error);
  });

  it("throws if the index is too large or too small", () => {
    expect(() => map.validateTileIndex(100)).toThrow(error);
    expect(() => map.validateTileIndex(-1)).toThrow(error);
    expect(() => map.validateTileIndex()).toThrow(error);
  });

  it("doesnt throw if the index is correct", () => {
    expect(() => map.validateTileIndex(0)).not.toThrow();
    expect(() => map.validateTileIndex(tileset.length - 1)).not.toThrow();
  });
});

describe("validateTileIndexes", () => {
  it("throws if no source array is passed", () => {
    expect(() => map.validateTileIndexes()).toThrow("expected source array");
  });

  it("throws if the source array has the wrong length", () => {
    const error = Error(`expected an array of length ${expectedLength}`);
    expect(() =>
      map.validateTileIndexes(new Array(expectedLength - 1))
    ).toThrow(error);
    expect(() =>
      map.validateTileIndexes(new Array(expectedLength + 1))
    ).toThrow(error);
  });

  it("throws if any of the indexes are invalid", () => {
    const error = Error(
      `expected an array of tile indexes between 0 and ${tileset.length}`
    );
    const src = new Array(expectedLength).fill(0);
    src[0] = 9001;
    expect(() => map.validateTileIndexes(src)).toThrow(error);
  });
});

describe("validateTileValues", () => {
  it("throws if no source array is passed", () => {
    expect(() => map.validateTileValues()).toThrow("expected source array");
  });

  it("throws if the source array has the wrong length", () => {
    const error = Error(`expected an array of length ${expectedLength}`);
    expect(() => map.validateTileValues(new Array(expectedLength - 1))).toThrow(
      error
    );
    expect(() => map.validateTileValues(new Array(expectedLength + 1))).toThrow(
      error
    );
  });

  it("throws if any of the values are invalid", () => {
    const error = Error(`expected an array of items ${tileset}`);
    const src = new Array(expectedLength).fill(tileset[0]);
    src[0] = "chainsaw";
    expect(() => map.validateTileValues(src)).toThrow(error);
  });
});

describe("validateDimensions", () => {
  it("throws if no width or height are set", () => {
    map = new Tilemap();
    expect(() => map.validateDimensions()).toThrow("expected width and height");
  });
});

describe("forEachTile", () => {
  it("validates the map dimensions", () => {
    const validateDimensions = jest
      .spyOn(map, "validateDimensions")
      .mockImplementation(() => {});

    expect(validateDimensions).not.toHaveBeenCalled();
    map.forEachTile(() => {});
    expect(validateDimensions).toHaveBeenCalledTimes(1);
  });

  it("executes the callback once for each tile position, with an index", () => {
    const cb = jest.fn();
    map.forEachTile(cb);
    expect(cb.mock.calls[0]).toEqual([0, 0, 0]);
    expect(cb.mock.calls[1]).toEqual([1, 0, 1]);
    expect(cb.mock.calls[2]).toEqual([2, 0, 2]);
    expect(cb.mock.calls[3]).toEqual([0, 1, 3]);
    expect(cb.mock.calls[4]).toEqual([1, 1, 4]);
    expect(cb.mock.calls[5]).toEqual([2, 1, 5]);
    expect(cb.mock.calls[6]).toEqual([0, 2, 6]);
    expect(cb.mock.calls[7]).toEqual([1, 2, 7]);
    expect(cb.mock.calls[8]).toEqual([2, 2, 8]);
    expect(cb).toHaveBeenCalledTimes(9);
  });
});

describe("set", () => {
  const value = 0;

  it("validates the position", () => {
    const validatePoint = jest
      .spyOn(map, "validatePoint")
      .mockImplementation(() => {});

    expect(validatePoint).not.toHaveBeenCalled();
    map.set(x, y, value);
    expect(validatePoint).toHaveBeenCalledWith(x, y);
    expect(validatePoint).toHaveBeenCalledTimes(1);
  });

  it("validates the tile index", () => {
    const validateTileIndex = jest
      .spyOn(map, "validateTileIndex")
      .mockImplementation(() => {});

    expect(validateTileIndex).not.toHaveBeenCalled();
    map.set(x, y, value);
    expect(validateTileIndex).toHaveBeenCalledWith(value);
    expect(validateTileIndex).toHaveBeenCalledTimes(1);
  });

  it("sets the tile index at the coordinates", () => {
    expect(map.tiles).toHaveLength(0);
    map.set(x, y, value);
    expect(map.tiles).toHaveLength(1);
    expect(map.tiles.get({ x, y })).toBe(value);
  });

  it("is chainable", () => {
    const returned = map.set(x, y, value).set(0, 0, value);
    expect(returned).toBeInstanceOf(Tilemap);
  });
});

describe("fromArray", () => {
  const sourceArray = [
    "rock",
    "paper",
    "scissors",
    "rock",
    "paper",
    "scissors",
    "rock",
    "paper",
    "scissors"
  ];

  it("validates the source array", () => {
    const validateTileValues = jest
      .spyOn(map, "validateTileValues")
      .mockImplementation(() => {});

    expect(validateTileValues).not.toHaveBeenCalled();
    map.fromArray(sourceArray);
    expect(validateTileValues).toHaveBeenCalledTimes(1);
    expect(validateTileValues).toHaveBeenCalledWith(sourceArray);
  });

  it("sets each tile correctly, treating null as index 0", () => {
    map.fromArray(sourceArray);
    expect(map.tiles.get({ x: 0, y: 0 })).toBe(0);
    expect(map.tiles.get({ x: 1, y: 0 })).toBe(1);
    expect(map.tiles.get({ x: 2, y: 0 })).toBe(2);
    expect(map.tiles.get({ x: 0, y: 1 })).toBe(0);
    expect(map.tiles.get({ x: 1, y: 1 })).toBe(1);
    expect(map.tiles.get({ x: 2, y: 1 })).toBe(2);
    expect(map.tiles.get({ x: 0, y: 2 })).toBe(0);
    expect(map.tiles.get({ x: 1, y: 2 })).toBe(1);
    expect(map.tiles.get({ x: 2, y: 2 })).toBe(2);
  });

  it("is chainable", () => {
    expect(map.fromArray(sourceArray)).toBeInstanceOf(Tilemap);
  });
});

describe("toArray", () => {
  let result;

  const topLeftIndex = 0;
  const bottomRightIndex = 1;

  beforeEach(() => {
    map.set(0, 0, topLeftIndex);
    map.set(width - 1, height - 1, bottomRightIndex);
    result = map.toArray();
  });

  it("returns an array with an entry for each tile position", () => {
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(width * height);
  });

  it("writes entries from the top left to the bottom right", () => {
    expect(result[0]).toEqual(tileset[topLeftIndex]);
    expect(result[result.length - 1]).toEqual(tileset[bottomRightIndex]);
  });

  it("fills in empty positions with null", () => {
    expect(result[1]).toBeNull();
    expect(result[2]).toBeNull();
  });
});

describe("to2DArray", () => {
  let result;

  const topRightIndex = 1;
  const bottomLeftIndex = 0;

  beforeEach(() => {
    map.set(width - 1, 0, topRightIndex);
    map.set(0, height - 1, bottomLeftIndex);
    result = map.to2DArray();
  });

  it("returns an array with an entry for each tile position", () => {
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(height);
    result.forEach(item => {
      expect(item).toBeInstanceOf(Array);
      expect(item).toHaveLength(width);
    });
  });

  it("sorts items as a list of rows", () => {
    expect(result[0][width - 1]).toEqual(tileset[topRightIndex]);
    expect(result[height - 1][0]).toEqual(tileset[bottomLeftIndex]);
  });

  it("fills in empty positions with null", () => {
    expect(result[0][0]).toBeNull();
    expect(result[1][1]).toBeNull();
  });
});

describe("toString", () => {
  let result;

  beforeEach(() => {
    map.load(source);
    result = map.toString();
  });

  it("returns a string representation of the tilemap", () => {
    expect(result).toEqual(
      `
rock,paper,scissors
rock,rock,rock
rock,paper,scissors
`
    );
  });
});

describe("load", () => {
  it("validates the source array", () => {
    const validateTileIndexes = jest
      .spyOn(map, "validateTileIndexes")
      .mockImplementation(() => {});

    expect(validateTileIndexes).not.toHaveBeenCalled();
    map.load(source);
    expect(validateTileIndexes).toHaveBeenCalledTimes(1);
    expect(validateTileIndexes).toHaveBeenCalledWith(source);
  });

  it("sets each tile correctly, treating null as index 0", () => {
    map.load(source);
    expect(map.tiles.get({ x: 0, y: 0 })).toBe(0);
    expect(map.tiles.get({ x: 1, y: 0 })).toBe(1);
    expect(map.tiles.get({ x: 2, y: 0 })).toBe(2);
    expect(map.tiles.get({ x: 0, y: 1 })).toBe(0);
    expect(map.tiles.get({ x: 1, y: 1 })).toBe(0);
    expect(map.tiles.get({ x: 2, y: 1 })).toBe(0);
    expect(map.tiles.get({ x: 0, y: 2 })).toBe(0);
    expect(map.tiles.get({ x: 1, y: 2 })).toBe(1);
    expect(map.tiles.get({ x: 2, y: 2 })).toBe(2);
  });

  it("is chainable", () => {
    expect(map.load(source)).toBeInstanceOf(Tilemap);
  });
});

describe("save", () => {
  let result;

  const topLeftIndex = 0;
  const bottomRightIndex = 1;

  beforeEach(() => {
    map.set(0, 0, topLeftIndex);
    map.set(width - 1, height - 1, bottomRightIndex);
    result = map.save();
  });

  it("returns an array with an entry for each tile position", () => {
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(width * height);
  });

  it("writes tile indexes from the top left to the bottom right", () => {
    expect(result[0]).toEqual(topLeftIndex);
    expect(result[result.length - 1]).toEqual(bottomRightIndex);
  });

  it("fills in empty positions with null", () => {
    expect(result[1]).toBeNull();
    expect(result[2]).toBeNull();
  });
});
