import { PointMap } from "revilossor-game-common";

export default class Tilemap<T> {
  protected tileset: T[];

  protected tiles: PointMap<number>;

  public width: number;

  public height: number;

  public constructor(width: number, height: number, tileset: T[]) {
    this.width = width;
    this.height = height;
    this.tiles = new PointMap<number>();
    this.tileset = tileset;
  }

  protected validateNumericField(
    value: number,
    max: number,
    field: string
  ): void {
    if (Number.isNaN(Number(value)) || value < 0 || value > max) {
      throw Error(`the ${field} should be a number between 0 and ${max}`);
    }
  }

  protected validatePoint(x: number, y: number): void {
    this.validateNumericField(x, this.width, "x coordinate");
    this.validateNumericField(y, this.height, "y coordinate");
  }

  protected validateTileIndex(index: number): void {
    this.validateNumericField(index, this.tileset.length, "tile index");
  }

  protected validateTileIndexes(src: number[]): void {
    if (typeof src === "undefined") {
      throw Error("expected source array");
    }
    const expectedLength = this.width * this.height;
    if (src.length !== expectedLength) {
      throw Error(`expected an array of length ${expectedLength}`);
    }
    src.forEach((index: number): void => {
      try {
        this.validateTileIndex(index);
      } catch (err) {
        throw Error(
          `expected an array of tile indexes between 0 and ${this.tileset.length}`
        );
      }
    });
  }

  protected validateTileValues(src: T[]): void {
    if (typeof src === "undefined") {
      throw Error("expected source array");
    }
    const expectedLength = this.width * this.height;
    if (src.length !== expectedLength) {
      throw Error(`expected an array of length ${expectedLength}`);
    }
    src.forEach((value: T): void => {
      if (this.tileset.indexOf(value) === -1) {
        throw Error(`expected an array of items ${this.tileset}`);
      }
    });
  }

  protected validateDimensions(): void {
    if (
      typeof this.width === "undefined" ||
      typeof this.height === "undefined"
    ) {
      throw Error("expected width and height");
    }
  }

  public forEachTile(
    // TODO also values
    callback: (x: number, y: number, index: number) => void
  ): void {
    this.validateDimensions();
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        callback(x, y, this.width * y + x);
      }
    }
  }

  public setIndex(x: number, y: number, tileIndex: number): Tilemap<T> {
    this.validatePoint(x, y);
    this.validateTileIndex(tileIndex);
    this.tiles.set({ x, y }, tileIndex);
    return this;
  }

  public toIndexes(): (number | null)[] {
    const array: (number | null)[] = new Array(this.width * this.height).fill(
      null
    );
    this.tiles.entries.forEach(([{ x, y }, value]): void => {
      array[y * this.width + x] = value;
    });
    return array;
  }

  public fromIndexes(src: number[]): Tilemap<T> {
    this.validateTileIndexes(src);
    this.forEachTile((x: number, y: number, index: number): void => {
      this.setIndex(x, y, src[index] === null ? 0 : src[index]);
    });
    return this;
  }

  public toValues(): (T | null)[] {
    const array: (T | null)[] = new Array(this.width * this.height).fill(null);
    this.tiles.entries.forEach(([{ x, y }, value]): void => {
      array[y * this.width + x] = this.tileset[value];
    });
    return array;
  }

  public fromValues(src: T[]): Tilemap<T> {
    this.validateTileValues(src);
    this.forEachTile((x: number, y: number, index: number): void => {
      this.setIndex(x, y, this.tileset.indexOf(src[index]));
    });
    return this;
  }

  public to2DArray<N>(array: (N | null)[]): (N | null)[][] {
    const result: (N | null)[][] = [];
    while (array.length > 0) {
      result.push(array.splice(0, this.width));
    }
    return result;
  }

  public to2DIndexes(): (number | null)[][] {
    return this.to2DArray(this.toIndexes());
  }

  public to2DValues(): (T | null)[][] {
    return this.to2DArray(this.toValues());
  }

  public save(): number[] {
    const result: (number | null)[] = this.toIndexes();
    return result.map((item: number | null): number =>
      item === null ? -1 : item
    );
  }

  public load(src: number[]): Tilemap<T> {
    this.fromIndexes(src);
    return this;
  }

  public toString(delimeter: string = ""): string {
    const tiles: (T | null)[][] = this.to2DValues();
    let output = `\n`;
    tiles.forEach((row: (T | null)[]): void => {
      output += `${row.join(delimeter)}\n`;
    });
    return output;
  }
}
