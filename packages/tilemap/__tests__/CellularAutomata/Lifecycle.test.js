const Lifecycle = require("../../src/CellularAutomata/Lifecycle").default;

let lifecycle;

beforeEach(() => {
  lifecycle = new Lifecycle();
});

describe("validateRulestring", () => {
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

describe("constructor", () => {
  it("validates the rulestring", () => {
    const validateRulestring = jest
      .spyOn(Lifecycle.prototype, "validateRulestring")
      .mockImplementation(() => {});

    expect(validateRulestring).not.toHaveBeenCalled();
    lifecycle = new Lifecycle();
    expect(validateRulestring).toHaveBeenCalledTimes(1);
  });
});

describe.each([["123/456", [1, 2, 3], [4, 5, 6], "dead", "none"]])(
  'for rulestring "%s"',
  (
    rulestring,
    expectedLiveList,
    expectedSurviveList,
    expectedNullMode,
    expectedLoopMode
  ) => {
    beforeEach(() => {
      lifecycle = new Lifecycle(rulestring);
    });

    it(`has a live list of "${expectedLiveList}"`, () => {
      expect(lifecycle.liveList).toEqual(expectedLiveList);
    });

    it(`has a survive list of "${expectedSurviveList}"`, () => {
      expect(lifecycle.surviveList).toEqual(expectedSurviveList);
    });

    it(`treats null values as ${expectedNullMode}`, () => {
      expect(lifecycle.nullMode).toEqual(expectedNullMode);
    });

    it(`has a loop mode of ${expectedLoopMode}`, () => {
      expect(lifecycle.loopMode).toEqual(expectedLoopMode);
    });
  }
);
