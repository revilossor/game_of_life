const { PointMap } = require("revilossor-game-common");

const Tilemap = require("../src/Tilemap").default;

const width = 2;
const height = 2;

let map;

const tileset = ["dead", "alive"];

describe("constructor", () => {
  beforeEach(() => {
    map = new Tilemap(width, height, tileset);
  });
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

// describe("to2DArray", () => {
//   it("returns an array of the values", () => {
//     map.set({ x: 0, y: 0 }, 0);
//     expect(new Tilemap(width, height)).toBeInstanceOf(Tilemap);
//   });
// });
