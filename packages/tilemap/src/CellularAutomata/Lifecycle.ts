export default class Lifecycle {
  public constructor() {}

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
