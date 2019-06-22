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
  // set
  // get
  // toarray - returns 2d array of T's ( parsed )

  // tostring - serializable interface, T is serializable
  // some bitwise way of referring to neighbours
  // get neighbours
  // noise
  // doCellularAutomata(born, survive, generations=1) - how to handle tilesets?

  // cellular automata as decorator class? takes a tilemap,
}
