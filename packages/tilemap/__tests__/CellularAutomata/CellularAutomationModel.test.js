const CellularAutomationModel = require("../../src/CellularAutomata/CellularAutomationModel")
  .default;

let model;

const live = ["paper"];
const dead = ["rock", "scissors"];
const ignore = ["hello"];
const born = [3];
const survive = [2, 3];

beforeEach(() => {
  model = new CellularAutomationModel(live, dead, ignore, born, survive);
});

describe("constructor", () => {
  describe("assigns properties", () => {
    it("live", () => {
      expect(model.live).toEqual(live);
    });
    it("dead", () => {
      expect(model.dead).toEqual(dead);
    });
    it("ignore", () => {
      expect(model.ignore).toEqual(ignore);
    });
    it("born", () => {
      expect(model.born).toEqual(born);
    });
    it("survive", () => {
      expect(model.survive).toEqual(survive);
    });
  });
});

describe("computed properties", () => {
  beforeEach(() => {
    Math.floor = () => 0;
  });

  it("liveValue", () => {
    expect(model.liveValue).toBe(live[0]);
  });

  it("deadValue", () => {
    expect(model.deadValue).toBe(dead[0]);
  });

  it("ignoredValue", () => {
    expect(model.ignoredValue).toBe(ignore[0]);
  });
});

describe("process", () => {
  beforeEach(() => {
    Math.floor = () => 0;
  });

  it("calculates birth correctly, treating null as dead", () => {
    expect(
      model.process({
        topLeft: "paper",
        top: "paper",
        topRight: "paper",
        left: "rock",
        right: "scissors",
        bottomLeft: "rock",
        bottom: "scissors",
        bottomRight: "rock"
      })
    ).toBe(live[0]);
    expect(
      model.process({
        topLeft: null,
        top: null,
        topRight: "paper",
        left: null,
        right: null,
        bottomLeft: "paper",
        bottom: null,
        bottomRight: "paper"
      })
    ).toBe(live[0]);
  });
  it("calculates survival correctly", () => {
    // only if currently alive
    expect(
      model.process(
        {
          topLeft: "paper",
          top: "paper",
          topRight: null,
          left: "rock",
          right: "scissors",
          bottomLeft: "rock",
          bottom: "scissors",
          bottomRight: "rock"
        },
        live[0]
      )
    ).toBe(live[0]);
    expect(
      model.process(
        {
          topLeft: null,
          top: null,
          topRight: "paper",
          left: null,
          right: null,
          bottomLeft: "paper",
          bottom: null,
          bottomRight: "paper"
        },
        live[0]
      )
    ).toBe(live[0]);
  });
  it("calculates death correctly", () => {
    expect(
      model.process({
        topLeft: "scissors",
        top: "rock",
        topRight: "scissors",
        left: "rock",
        right: "scissors",
        bottomLeft: "rock",
        bottom: "scissors",
        bottomRight: "rock"
      })
    ).toBe(dead[0]);
    expect(
      model.process({
        topLeft: "scissors",
        top: "rock",
        topRight: "scissors",
        left: "rock",
        right: "scissors",
        bottomLeft: "rock",
        bottom: "scissors",
        bottomRight: "paper"
      })
    ).toBe(dead[0]);
    expect(
      model.process({
        topLeft: "scissors",
        top: "rock",
        topRight: "scissors",
        left: "rock",
        right: "paper",
        bottomLeft: "paper",
        bottom: "paper",
        bottomRight: "paper"
      })
    ).toBe(dead[0]);
    expect(
      model.process({
        topLeft: "scissors",
        top: "rock",
        topRight: "scissors",
        left: "paper",
        right: "paper",
        bottomLeft: "paper",
        bottom: "paper",
        bottomRight: "paper"
      })
    ).toBe(dead[0]);
    expect(
      model.process({
        topLeft: "scissors",
        top: "rock",
        topRight: "paper",
        left: "paper",
        right: "paper",
        bottomLeft: "paper",
        bottom: "paper",
        bottomRight: "paper"
      })
    ).toBe(dead[0]);
    expect(
      model.process({
        topLeft: "scissors",
        top: "paper",
        topRight: "paper",
        left: "paper",
        right: "paper",
        bottomLeft: "paper",
        bottom: "paper",
        bottomRight: "paper"
      })
    ).toBe(dead[0]);
    expect(
      model.process({
        topLeft: "paper",
        top: "paper",
        topRight: "paper",
        left: "paper",
        right: "paper",
        bottomLeft: "paper",
        bottom: "paper",
        bottomRight: "paper"
      })
    ).toBe(dead[0]);
  });

  it("doesnt change the value of a persisted state with more than one possible value", () => {
    expect(
      model.process(
        {
          topLeft: "scissors",
          top: "rock",
          topRight: "scissors",
          left: "rock",
          right: "scissors",
          bottomLeft: "rock",
          bottom: "scissors",
          bottomRight: "rock"
        },
        dead[1]
      )
    ).toBe(dead[1]);
  });

  // TODO it doesnt process nodes on the ignore list ( but still counts as neighbours )
});
