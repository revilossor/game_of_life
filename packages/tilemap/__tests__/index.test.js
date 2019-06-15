const { Tilemap } = require("../src/index");

describe("Tilemap", () => {
  it("expxorts a constructor", () => {
    expect(new Tilemap()).toBeInstanceOf(Tilemap);
  });
});
