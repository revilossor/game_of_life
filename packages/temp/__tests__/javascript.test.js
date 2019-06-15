const Level = require("../src/Level").default;

beforeAll(() => {
  console.dir = jest.fn(); // eslint-disable-line no-console
});

describe("Level", () => {
  it("prints", () => {
    const level = new Level();
    level.print();
    expect(console.dir).toHaveBeenCalled(); // eslint-disable-line no-console
  });
});
