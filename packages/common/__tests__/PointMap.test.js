const PointMap = require("../src/PointMap").default;

const point = { x: 10, y: 10 };
const hash = JSON.stringify(point);

const value = "42";

let map;

beforeEach(() => {
  map = new PointMap();
});

describe("length", () => {
  it("starts empty", () => {
    expect(map).toHaveLength(0);
  });

  it("has the correct length after setting a couple", () => {
    map.set(point, 0);
    expect(map).toHaveLength(1);
    map.set({ x: 0, y: 0 }, 1);
    expect(map).toHaveLength(2);
  });
});

describe("set", () => {
  it("sets the item at the passed coordinates", () => {
    map.set(point, value);
    expect(map.items).toEqual(
      expect.objectContaining({
        [hash]: value
      })
    );
  });

  it("setting an occopied position overrites the value", () => {
    map.set(point, value);
    expect(map.items).toEqual(
      expect.objectContaining({
        [hash]: value
      })
    );
    const newValue = "123";
    map.set(point, newValue);
    expect(map.items).toEqual(
      expect.objectContaining({
        [hash]: newValue
      })
    );
  });
});

describe("get", () => {
  beforeEach(() => {
    map.set(point, value);
  });

  it("returns the item at the point", () => {
    expect(map.get(point)).toBe(value);
  });

  it("returns undefined if there is no item at the point", () => {
    expect(map.get({ x: 0, y: 0 })).not.toBeDefined();
  });
});
