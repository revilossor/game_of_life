export default class Tileset<T> {
  private members: T[];

  constructor(...items: T[]) {
    this.members = [...items];
  }

  public get length(): number {
    return this.members.length;
  }

  private validateNumericField(
    value: number,
    max: number,
    field: string
  ): void {
    if (Number.isNaN(Number(value)) || value < 0 || value > max) {
      throw Error(`the ${field} should be a number between 0 and ${max}`);
    }
  }

  public validateTileIndex(index: number): void {
    this.validateNumericField(index, this.members.length, "tile index");
  }

  public validateTileIndexes(src: number[]): void {
    if (typeof src === "undefined") {
      throw Error("expected source array");
    }
    src.forEach((index: number): void => {
      try {
        this.validateTileIndex(index);
      } catch (err) {
        throw Error(
          `expected an array of tile indexes between 0 and ${this.members.length}`
        );
      }
    });
  }

  public validateTileValues(src: T[]): void {
    if (typeof src === "undefined") {
      throw Error("expected source array");
    }
    src.forEach((value: T): void => {
      if (this.members.indexOf(value) === -1) {
        throw Error(`expected an array of items ${this.members}`);
      }
    });
  }

  public getValue(index: number): T {
    this.validateTileIndex(index);
    return this.members[index];
  }

  public getIndex(value: T): number {
    const index = this.members.indexOf(value);
    if (index === -1) {
      throw Error(`expected an item ${this.members}`);
    }
    return index;
  }
}
