const Lifecycle = require("../../src/CellularAutomata/Lifecycle").default;

let lifecycle;

const live = ["paper"];
const dead = ["rock", "scissors"];
const born = [3];
const survive = [2, 3];

beforeEach(() => {
  lifecycle = new Lifecycle(live, dead, born, survive);
});

describe("constructor", () => {
  describe("assigns properties", () => {
    it("live", () => {
      expect(lifecycle.live).toEqual(live);
    });
    it("dead", () => {
      expect(lifecycle.dead).toEqual(dead);
    });
    it("born", () => {
      expect(lifecycle.born).toEqual(born);
    });
    it("survive", () => {
      expect(lifecycle.survive).toEqual(survive);
    });
  });
});

describe("computed properties", () => {
  beforeEach(() => {
    Math.floor = () => 0;
  });

  it("liveValue", () => {
    expect(lifecycle.liveValue).toBe(live[0]);
  });

  it("deadValue", () => {
    expect(lifecycle.deadValue).toBe(dead[0]);
  });
});

describe("process", () => {
  beforeEach(() => {
    Math.floor = () => 0;
  });

  it("calculates birth correctly", () => {
    expect(
      lifecycle.process({
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
      lifecycle.process({
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
    expect(
      lifecycle.process({
        topLeft: "paper",
        top: "paper",
        topRight: null,
        left: "rock",
        right: "scissors",
        bottomLeft: "rock",
        bottom: "scissors",
        bottomRight: "rock"
      })
    ).toBe(live[0]);
    expect(
      lifecycle.process({
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
  it("calculates death correctly", () => {
    expect(
      lifecycle.process({
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
      lifecycle.process({
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
      lifecycle.process({
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
      lifecycle.process({
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
      lifecycle.process({
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
      lifecycle.process({
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
      lifecycle.process({
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
});
