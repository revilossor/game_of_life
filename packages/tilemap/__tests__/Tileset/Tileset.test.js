const Tileset = require("../../src/Tileset/Tileset").default;

// TODO construct with rest of T
// validate tile index / indexes / values
// get value for index
// get index for value
// to string
// length
// includes index / value
// get random tile index / value

let tileset;

const tiles = ["square", "circle", "cross", "triangle"];

beforeEach(() => {
  tileset = new Tileset(...tiles);
});

describe("validateTileIndex", () => {
  const error = Error(
    `the tile index should be a number between 0 and ${tiles.length}`
  );

  it("throws if the index isnt a number", () => {
    expect(() => tileset.validateTileIndex("poo")).toThrow(error);
  });

  it("throws if the index is too large or too small", () => {
    expect(() => tileset.validateTileIndex(100)).toThrow(error);
    expect(() => tileset.validateTileIndex(-1)).toThrow(error);
    expect(() => tileset.validateTileIndex()).toThrow(error);
  });

  it("doesnt throw if the index is correct", () => {
    expect(() => tileset.validateTileIndex(0)).not.toThrow();
    expect(() => tileset.validateTileIndex(tiles.length - 1)).not.toThrow();
  });
});

describe("validateTileIndexes", () => {
  it("throws if no source array is passed", () => {
    expect(() => tileset.validateTileIndexes()).toThrow(
      "expected source array"
    );
  });

  it("throws if any of the indexes are invalid", () => {
    const error = Error(
      `expected an array of tile indexes between 0 and ${tiles.length}`
    );
    const src = new Array(tiles.length).fill(0);
    src[0] = 9001;
    expect(() => tileset.validateTileIndexes(src)).toThrow(error);
  });
});

describe("validateTileValues", () => {
  it("throws if no source array is passed", () => {
    expect(() => tileset.validateTileValues()).toThrow("expected source array");
  });

  it("throws if any of the values are invalid", () => {
    const error = Error(`expected an array of items ${tiles}`);
    const src = new Array(tiles.length).fill(tiles[0]);
    src[0] = "chainsaw";
    expect(() => tileset.validateTileValues(src)).toThrow(error);
  });
});

describe("getValue", () => {
  it("returns the value for the index", () => {
    expect(tileset.getValue(0)).toEqual(tiles[0]);
  });
  it("throws if an invalid index is passed", () => {
    const error = Error("the tile index should be a number between 0 and 4");
    expect(() => tileset.getValue(-1)).toThrow(error);
    expect(() => tileset.getValue(9001)).toThrow(error);
    expect(() => tileset.getValue("poo")).toThrow(error);
    expect(() => tileset.getValue(() => {})).toThrow(error);
    expect(() => tileset.getValue({ an: "object" })).toThrow(error);
  });
});
