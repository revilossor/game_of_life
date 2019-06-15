const { Tilemap } = require("../src/index");

const width = 800;
const height = 600;

describe("Tilemap", () => {
  it("expxorts a constructor", () => {
    expect(new Tilemap(width, height)).toBeInstanceOf(Tilemap);
  });
});
