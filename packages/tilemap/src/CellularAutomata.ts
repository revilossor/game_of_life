import Neighbours from "./Neighbours";
import Tilemap from "./Tilemap";

export default class CellularAutomata<T> extends Tilemap<T> {
  public getNeighbours(x: number, y: number): Neighbours {
    function nullify(value?: number): number | null {
      return typeof value === "undefined" ? null : value;
    }
    return {
      topLeft: nullify(this.tiles.get({ x: x - 1, y: y - 1 })),
      top: nullify(this.tiles.get({ x, y: y - 1 })),
      topRight: nullify(this.tiles.get({ x: x + 1, y: y - 1 })),
      left: nullify(this.tiles.get({ x: x - 1, y })),
      right: nullify(this.tiles.get({ x: x + 1, y })),
      bottomLeft: nullify(this.tiles.get({ x: x - 1, y: y + 1 })),
      bottom: nullify(this.tiles.get({ x, y: y + 1 })),
      bottomRight: nullify(this.tiles.get({ x: x + 1, y: y + 1 }))
    };
  }
}
