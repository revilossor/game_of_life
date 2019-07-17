import Neighbours from "./Neighbours";
import CellularAutomationModel from "./CellularAutomationModel";
import Tilemap from "../Tilemap";

// TODO can have multiple CellularAutomationModels, CellularAutomationModels can have ignore lists
// register / deregister CellularAutomationModels - advance them independantly

// Rename - AutomataTilemap

export default class CellularAutomata<T> extends Tilemap<T> {
  protected model: CellularAutomationModel<T>;

  public constructor(
    width: number,
    height: number,
    tileset: T[],
    model: CellularAutomationModel<T>
  ) {
    super(width, height, tileset);
    this.model = model;
  }

  public getNeighbours(x: number, y: number): Neighbours<T> {
    function nullify(value?: T): T | null {
      return typeof value === "undefined" ? null : value;
    }
    return {
      topLeft: nullify(this.tileset[this.tiles.get({ x: x - 1, y: y - 1 })]),
      top: nullify(this.tileset[this.tiles.get({ x, y: y - 1 })]),
      topRight: nullify(this.tileset[this.tiles.get({ x: x + 1, y: y - 1 })]),
      left: nullify(this.tileset[this.tiles.get({ x: x - 1, y })]),
      right: nullify(this.tileset[this.tiles.get({ x: x + 1, y })]),
      bottomLeft: nullify(this.tileset[this.tiles.get({ x: x - 1, y: y + 1 })]),
      bottom: nullify(this.tileset[this.tiles.get({ x, y: y + 1 })]),
      bottomRight: nullify(this.tileset[this.tiles.get({ x: x + 1, y: y + 1 })])
    };
  }

  private step(): CellularAutomata<T> {
    const current: (T | null)[] = this.toArray();
    const neighbourTuples: [T, Neighbours<T>][] = current.map(
      (item: T | null, index: number): [T, Neighbours<T>] => {
        return [
          item || this.tileset[0],
          this.getNeighbours(index % this.width, Math.floor(index / this.width))
        ];
      }
    );
    const processed: T[] = neighbourTuples.map(
      (tuple: [T, Neighbours<T>]): T => this.model.process(tuple[1], tuple[0])
    );
    return this.fromArray(processed);
  }

  public fromArray(src: T[]): CellularAutomata<T> {
    super.fromArray(src);
    return this;
  }

  public generate(generations: number): CellularAutomata<T> {
    for (let n: number = generations; n > 0; --n) {
      // while
      this.step();
    }
    return this;
  }

  public noise(percentAlive: number): CellularAutomata<T> {
    const length: number = this.width * this.height;
    const source: number[] = [];

    if (typeof percentAlive === "undefined") {
      while (source.length < length) {
        source.push(Math.floor(Math.random() * this.tileset.length));
      }
      this.load(source);
    } else {
      if (percentAlive < 0 || percentAlive > 1) {
        throw Error("expected a number between 0 and 1");
      }

      const expectedAlive: number = Math.round(length * percentAlive);

      while (source.length < expectedAlive) {
        source.push(
          this.tileset.indexOf(
            this.model.live[Math.floor(Math.random() * this.model.live.length)]
          )
        );
      }

      while (source.length < length) {
        source.push(
          this.tileset.indexOf(
            this.model.dead[Math.floor(Math.random() * this.model.dead.length)]
          )
        );
      }

      const shuffledSource: number[] = source
        .map((item: number): number[] => [Math.random(), item])
        .sort((a: number[], b: number[]): number => a[0] - b[0])
        .map((a: number[]): number => a[1]);

      this.load(shuffledSource);
    }

    return this;
  }
}
