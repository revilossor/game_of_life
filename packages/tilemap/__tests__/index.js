const index = require("../src/index");

const AutomataTilemap = require("../src/AutomataTilemap");

it("exports a AutomataTilemap", () => {
  expect(index.default).toBeDefined();
  expect(index.default).toEqual(AutomataTilemap.default);
});

it("exports a AutomataTilemapModel", () => {
  expect(index.AutomationModel).toBeDefined();
  expect(index.AutomationModel).toEqual(AutomataTilemap.AutomationModel);
});
