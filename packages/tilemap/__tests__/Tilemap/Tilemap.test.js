const { PointMap } = require("revilossor-game-common");

const Tilemap = require("../../src/Tilemap").default;
const Tileset = require("../../src/Tileset").default;

const width = 3;
const height = 3;

const tileset = new Tileset("rock", "paper", "scissors");
const source = [0, 1, 2, null, null, null, 0, 1, 2];

beforeEach(() => {});

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

describe("validateDimensions", () => {
  it("throws if no width or height are set", () => {
    map = new Tilemap();
    expect(() => map.validateDimensions()).toThrow("expected width and height");
  });
});

describe("forEachPosition", () => {
  it("validates the map dimensions", () => {
    const validateDimensions = jest
      .spyOn(map, "validateDimensions")
      .mockImplementation(() => {});

    expect(validateDimensions).not.toHaveBeenCalled();
    map.forEachPosition(() => {});
    expect(validateDimensions).toHaveBeenCalledTimes(1);
  });

  it("executes the callback once for each tile position, with an index and the value", () => {
    const cb = jest.fn();
    map.forEachPosition(cb);
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

describe("setIndex", () => {
  const value = 0;

  it("validates the position", () => {
    const validatePoint = jest
      .spyOn(map, "validatePoint")
      .mockImplementation(() => {});

    expect(validatePoint).not.toHaveBeenCalled();
    map.setIndex(x, y, value);
    expect(validatePoint).toHaveBeenCalledWith(x, y);
    expect(validatePoint).toHaveBeenCalledTimes(1);
  });

  it("validates the tile index", () => {
    const validateTileIndex = jest
      .spyOn(tileset, "validateTileIndex")
      .mockImplementation(() => {});

    expect(validateTileIndex).not.toHaveBeenCalled();
    map.setIndex(x, y, value);
    expect(validateTileIndex).toHaveBeenCalledWith(value);
    expect(validateTileIndex).toHaveBeenCalledTimes(1);
  });

  it("sets the tile index at the coordinates", () => {
    expect(map.tiles).toHaveLength(0);
    map.setIndex(x, y, value);
    expect(map.tiles).toHaveLength(1);
    expect(map.tiles.get({ x, y })).toBe(value);
  });

  it("is chainable", () => {
    const returned = map.setIndex(x, y, value).setIndex(0, 0, value);
    expect(returned).toBeInstanceOf(Tilemap);
  });
});

describe("toIndexes", () => {
  let result;

  const topLeftIndex = 0;
  const bottomRightIndex = 1;

  beforeEach(() => {
    map.setIndex(0, 0, topLeftIndex);
    map.setIndex(width - 1, height - 1, bottomRightIndex);
    result = map.toIndexes();
  });

  it("returns an array with an entry for each tile position", () => {
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(width * height);
  });

  it("writes entries from the top left to the bottom right", () => {
    expect(result[0]).toEqual(topLeftIndex);
    expect(result[result.length - 1]).toEqual(bottomRightIndex);
  });

  it("fills in empty positions with null", () => {
    expect(result[1]).toBeNull();
    expect(result[2]).toBeNull();
  });

  it("works for different dimensions", () => {
    map = new Tilemap(4, 2, tileset);
    map.setIndex(0, 0, topLeftIndex);
    map.setIndex(3, 1, bottomRightIndex);
    result = map.toIndexes();
    expect(result[0]).toEqual(topLeftIndex);
    expect(result[result.length - 1]).toEqual(bottomRightIndex);
  });
});

describe("fromIndexes", () => {
  const sourceArray = [0, 1, 2, 0, 1, 2, 0, 1, 2];

  it("validates the source array", () => {
    // TODO validated in the tileset
    const validateTileIndexes = jest
      .spyOn(map, "validateTileIndexes")
      .mockImplementation(() => {});

    expect(validateTileIndexes).not.toHaveBeenCalled();
    map.fromIndexes(sourceArray);
    expect(validateTileIndexes).toHaveBeenCalledTimes(1);
    expect(validateTileIndexes).toHaveBeenCalledWith(sourceArray);
  });

  it("sets each tile correctly, treating null as index 0", () => {
    map.fromIndexes(sourceArray);
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
    expect(map.fromIndexes(sourceArray)).toBeInstanceOf(Tilemap);
  });
});

describe("toValues", () => {
  let result;

  const topLeftIndex = 0;
  const bottomRightIndex = 1;

  beforeEach(() => {
    map.setIndex(0, 0, topLeftIndex);
    map.setIndex(width - 1, height - 1, bottomRightIndex);
    result = map.toValues();
  });

  it("returns an array with an entry for each tile position", () => {
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(width * height);
  });

  it("writes values from the top left to the bottom right", () => {
    expect(result[0]).toEqual(tileset.getValue(topLeftIndex));
    expect(result[result.length - 1]).toEqual(
      tileset.getValue(bottomRightIndex)
    );
  });

  it("fills in empty positions with null", () => {
    expect(result[1]).toBeNull();
    expect(result[2]).toBeNull();
  });
});

describe("fromValues", () => {
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
    // TODO validates in the tilesrt
    const validateTileValues = jest
      .spyOn(map, "validateTileValues")
      .mockImplementation(() => {});

    expect(validateTileValues).not.toHaveBeenCalled();
    map.fromValues(sourceArray);
    expect(validateTileValues).toHaveBeenCalledTimes(1);
    expect(validateTileValues).toHaveBeenCalledWith(sourceArray);
  });

  it("sets each tile correctly, treating null as index 0", () => {
    map.fromValues(sourceArray);
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
    expect(map.fromValues(sourceArray)).toBeInstanceOf(Tilemap);
  });
});

describe("to2DIndexes", () => {
  let result;

  const topRightIndex = 1;
  const bottomLeftIndex = 0;

  beforeEach(() => {
    map.setIndex(width - 1, 0, topRightIndex);
    map.setIndex(0, height - 1, bottomLeftIndex);
    result = map.to2DIndexes();
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
    expect(result[0][width - 1]).toEqual(topRightIndex);
    expect(result[height - 1][0]).toEqual(bottomLeftIndex);
  });

  it("fills in empty positions with null", () => {
    expect(result[0][0]).toBeNull();
    expect(result[1][1]).toBeNull();
  });

  it("works for different dimensions", () => {
    map = new Tilemap(4, 2, tileset);
    map.setIndex(3, 0, topRightIndex);
    map.setIndex(0, 1, bottomLeftIndex);
    result = map.to2DIndexes();
    expect(result[0][3]).toEqual(topRightIndex);
    expect(result[1][0]).toEqual(bottomLeftIndex);
  });
});

describe("to2DValues", () => {
  let result;

  const topRightIndex = 1;
  const bottomLeftIndex = 0;

  beforeEach(() => {
    map.setIndex(width - 1, 0, topRightIndex);
    map.setIndex(0, height - 1, bottomLeftIndex);
    result = map.to2DValues();
  });

  it("returns an array with an entry for each tile position", () => {
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(height);
    result.forEach(item => {
      expect(item).toBeInstanceOf(Array);
      expect(item).toHaveLength(width);
    });
  });

  it("sorts values a list of rows", () => {
    expect(result[0][width - 1]).toEqual(tileset.getValue(topRightIndex));
    expect(result[height - 1][0]).toEqual(tileset.getValue(bottomLeftIndex));
  });

  it("fills in empty positions with null", () => {
    expect(result[0][0]).toBeNull();
    expect(result[1][1]).toBeNull();
  });

  it("works for different dimensions", () => {
    map = new Tilemap(4, 2, tileset);
    map.setIndex(3, 0, topRightIndex);
    map.setIndex(0, 1, bottomLeftIndex);
    result = map.to2DValues();
    expect(result[0][3]).toEqual(tileset.getValue(topRightIndex));
    expect(result[1][0]).toEqual(tileset.getValue(bottomLeftIndex));
  });
});

describe("save", () => {
  let result;

  const topLeftIndex = 0;
  const bottomRightIndex = 1;

  beforeEach(() => {
    map.setIndex(0, 0, topLeftIndex);
    map.setIndex(width - 1, height - 1, bottomRightIndex);
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

  it("fills in empty positions with -1", () => {
    expect(result[1]).toEqual(-1);
    expect(result[2]).toEqual(-1);
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

describe("toString", () => {
  let result;

  beforeEach(() => {
    map.load(source);
  });

  describe("if no delimeter argument is passed", () => {
    beforeEach(() => {
      result = map.toString();
    });

    it("returns a string representation of the tilemap, with no delimeter", () => {
      expect(result).toEqual(
        "\nrockpaperscissors\nrockrockrock\nrockpaperscissors\n"
      );
    });
  });

  describe("if a delimeter argument is passed", () => {
    const delimeter = "||";

    beforeEach(() => {
      result = map.toString(delimeter);
    });

    it("returns a string representation of the tilemap, with the delimeter", () => {
      expect(result).toEqual(
        `\nrock${delimeter}paper${delimeter}scissors\nrock${delimeter}rock${delimeter}rock\nrock${delimeter}paper${delimeter}scissors\n`
      );
    });
  });

  it("works for different dimensions", () => {
    map = new Tilemap(4, 2, tileset);
    map.load([1, 0, 0, 1, 0, 2, 2, 0]);
    expect(map.toString()).toEqual(
      "\npaperrockrockpaper\nrockscissorsscissorsrock\n"
    );
  });
});
