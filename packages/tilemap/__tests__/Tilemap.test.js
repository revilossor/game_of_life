const { PointMap } = require("revilossor-game-common");

const Tilemap = require("../src/Tilemap").default;

const width = 2;
const height = 2;
const tileset = ["dead", "alive"];

const x = 1;
const y = 2;

const value = 0;

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

describe("validate point", () => {
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

describe("validate tile index", () => {
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

describe("validate dimensions", () => {
  it("throws if no width or height are set", () => {
    map = new Tilemap();
    expect(() => map.validateDimensions()).toThrow("expected width and height");
  });
});

describe("set", () => {
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

  it("writes entries from the top left to the bottom right", () => {
    expect(result[0][1]).toEqual(tileset[topRightIndex]);
    expect(result[1][0]).toEqual(tileset[bottomLeftIndex]);
  });

  it("fills in empty positions with null", () => {
    expect(result[0][0]).toBeNull();
    expect(result[1][1]).toBeNull();
  });
});

describe("fromArray", () => {
  it("validates the map dimensions", () => {
    const validateDimensions = jest
      .spyOn(map, "validateDimensions")
      .mockImplementation(() => {});

    expect(validateDimensions).not.toHaveBeenCalled();
    map.fromArray([]);
    expect(validateDimensions).toHaveBeenCalledTimes(1);
  });

  it("throws if no source array is passed", () => {
    expect(() => map.fromArray()).toThrow("expected source array");
  });
});
