export default class Lifecycle {
  public liveList: number[] = [1, 2, 3];

  public surviveList: number[] = [4, 5, 6];

  public nullMode: string = "dead";

  public loopMode: string = "none";

  public constructor(public rulestring: string = "") {
    this.validateRulestring(rulestring);
  }

  protected validateRulestring(string: string): void {
    if (!string.match(/^\d*([\/-]\d*){0,1}[hvb]*$/)) {
      throw Error("expected a valid rulestring");
    }
    const parts: string[] = string.split(/[\/-]/); // TODO listsFromString?
    if (parts.length === 2) {
      const last: string = parts.pop() || "";
      parts.push(last.split(/[hvb]/)[0]);
      const born: number[] = this.parseDigitList(parts[0]);
      const survive: number[] = this.parseDigitList(parts[1]);
      if (born.some((index: number) => survive.indexOf(index) >= 0)) {
        throw Error(
          "expected a rulestring with mutually exclusive born and survive lists"
        );
      }
    }
  }

  protected parseDigitList(string: string): number[] {
    let i: number = string.length;
    const indexes: Set<number> = new Set<number>();
    while (i--) {
      indexes.add(parseInt(string.charAt(i)));
    }
    const list: number[] = [...indexes];
    if (list.some((item: number) => Number.isNaN(item))) {
      throw Error("expected each digit to be an integer");
    }
    return list;
  }
}
