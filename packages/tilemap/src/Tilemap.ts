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
    console.dir({
      tiles: JSON.stringify(this.tiles.items),
      width: this.width,
      height: this.height,
      tileset: this.tileset
    });
  }

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
    if (Number.isNaN(Number(index)) || index < 0 || index > this.tiles.length) {
      throw Error(
        `the tile index should be a number between 0 and ${this.tiles.length}`
      );
    }
  }

  public set(x: number, y: number, tileIndex: number): Tilemap<T> {
    this.validatePoint(x, y);
    this.validateTileIndex(tileIndex);
    this.tiles.set({ x, y }, tileIndex);
    return this;
  }
  // get
  // toarray - returns 2d array of T's ( parsed )

  // tostring - serializable interface, T is serializable
  // some bitwise way of referring to neighbours
  // get neighbours
  // noise
  // doCellularAutomata(born, survive, generations=1) - how to handle tilesets?

  // cellular automata as decorator class? takes a tilemap,
}
