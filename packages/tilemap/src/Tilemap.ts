import { Point } from "revilossor-game-common";

interface PointMap {
  items: [Point, number][];
}

export default class Tilemap {
  private tiles: PointMap;

  private width: number;
  private height: number;

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = {
      items: []
    };
    console.dir({
      items: JSON.stringify(this.tiles.items),
      width: this.width,
      height: this.height
    });
  }
}
