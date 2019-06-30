const Lifecycle = require("../../src/CellularAutomata/Lifecycle").default;

// parse digit list
// validate rulestring - list nullDelimeter list loop - [123] [\ or /] [123] [h or v or b]

let lifecycle;

beforeEach(() => {
  lifecycle = new Lifecycle();
});

describe("validate rulestring", () => {
  it.each([
    "",
    "123",
    "0/1",
    "0-1",
    "123/456",
    "23-45h",
    "09-12v",
    "12/34b",
    "/",
    "-",
    "/b",
    "/1h",
    "-1234b",
    "1v",
    "1234h"
  ])('"%s" is valid', rulestring => {
    expect(() => lifecycle.validateRulestring(rulestring)).not.toThrow();
  });

  it("invalid strings throw", () => {
    const error = Error("expected a valid rulestring");
    expect(() => lifecycle.validateRulestring("something")).toThrow(error);
  });

  it("throws if the same tile index is in the born and survive lists", () => {
    const error = Error(
      "expected a rulestring with mutually exclusive born and survive lists"
    );
    expect(() => lifecycle.validateRulestring("1/1h")).toThrow(error);
    expect(() => lifecycle.validateRulestring("1234/56781")).toThrow(error);
  });
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
