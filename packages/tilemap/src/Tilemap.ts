import { PointMap } from "revilossor-game-common";

export default class Tilemap<T> {
  private tileset: T[];

  private tiles: PointMap<number>;

  private width: number;

  private height: number;

  public constructor(width: number, height: number, tileset: T[]) {
    this.width = width;
    this.height = height;
    this.tiles = new PointMap<number>();
    this.tileset = tileset;
  }

  // TODO dry here...
  private validatePoint(x: number, y: number): void {
    if (Number.isNaN(Number(x)) || x < 0 || x > this.width) {
      throw Error(
        `the x coordinate should be a number between 0 and ${this.width}`
      );
    }
    if (Number.isNaN(Number(y)) || y < 0 || y > this.height) {
      throw Error(
        `the y coordinate should be a number between 0 and ${this.height}`
      );
    }
  }

  private validateTileIndex(index: number): void {
    if (
      Number.isNaN(Number(index)) ||
      index < 0 ||
      index > this.tileset.length
    ) {
      throw Error(
        `the tile index should be a number between 0 and ${this.tileset.length}`
      );
    }
  }

  public set(x: number, y: number, tileIndex: number): Tilemap<T> {
    this.validatePoint(x, y);
    this.validateTileIndex(tileIndex);
    this.tiles.set({ x, y }, tileIndex);
    return this;
  }

  public toArray(): T | null[] {
    const array = new Array(this.width * this.height).fill(null);
    this.tiles.entries.forEach(([{ x, y }, value]) => {
      array[y * this.width + x] = this.tileset[value];
    });
    return array;
  }

  // toarray - returns 2d array of instances
  //  pass x, y, width, height for sub grid

  // tostring - serializable interface, T is serializable
  //  calls serialive on every instance
  // get neighbours
  //  some bitwise way of referring to neighbours
  // noise
  // doCellularAutomata(born, survive, generations=1) - how to handle tilesets?

  // cellular automata as decorator class? takes a tilemap,
}
