import { PointMap } from "revilossor-game-common";

export default class Tilemap<T> {
  private tileset: T[];

  private tiles: PointMap<number>;

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

  public set(x: number, y: number, tileIndex: number): Tilemap<T> {
    this.validatePoint(x, y);
    this.validateTileIndex(tileIndex);
    this.tiles.set({ x, y }, tileIndex);
    return this;
  }

  public toArray(): (T | null)[] {
    const array = new Array(this.width * this.height).fill(null);
    this.tiles.entries.forEach(([{ x, y }, value]): void => {
      array[y * this.width + x] = this.tileset[value];
    });
    return array;
  }

  public to2DArray(): (T | null)[][] {
    const array: (T | null)[] = this.toArray();
    const result: (T | null)[][] = [];
    while (array.length > 0) {
      result.push(array.splice(0, this.width));
    }
    return result;
  }
}
