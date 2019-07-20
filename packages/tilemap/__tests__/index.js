const index = require("../src/index");

const CellularAutomata = require("../src/CellularAutomata");

it("exports a CellularAutomata", () => {
  expect(index.default).toBeDefined();
  expect(index.default).toEqual(CellularAutomata.default);
});

it("exports a CellularAutomataModel", () => {
  expect(index.CellularAutomationModel).toBeDefined();
  expect(index.CellularAutomationModel).toEqual(
    CellularAutomata.CellularAutomationModel
  );
});
