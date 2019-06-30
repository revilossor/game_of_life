const Lifecycle = require("../../src/CellularAutomata/Lifecycle").default;

// parse digit list
// validate rulestring - list nullDelimeter list loop - [123] [\ or /] [123] [h or v or b]

let lifecycle;

beforeEach(() => {
  lifecycle = new Lifecycle();
});

describe("parseDigitList", () => {
  it("returns an array of parsed single digit numbers", () => {
    expect(lifecycle.parseDigitList("123")).toEqual(
      expect.arrayContaining([1, 2, 3])
    );
  });

  it("throws if a digit doesnt parse", () => {
    const error = Error("expected each digit to be an integer");
    expect(() => lifecycle.parseDigitList("the moon")).toThrow(error);
  });

  it("dedupes the list", () => {
    expect(lifecycle.parseDigitList("54377017")).toEqual(
      expect.arrayContaining([5, 4, 3, 7, 0, 1])
    );
  });
});

// throws if on both lists

// describe('default rulestring', () => {
//
// })
