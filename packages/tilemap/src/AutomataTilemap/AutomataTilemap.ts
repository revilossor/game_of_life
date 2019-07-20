import Neighbours from "./Neighbours";
import AutomationModel from "./AutomationModel";
import Tilemap from "../Tilemap";
import Tileset from "../Tileset";

// TODO can have multiple AutomationModels, AutomationModels can have ignore lists
// register / deregister AutomationModels - advance them independantly

export default class AutomataTilemap<T> extends Tilemap<T> {
  protected model: AutomationModel<T>;

  public constructor(
    width: number,
    height: number,
    tileset: Tileset<T>,
    model: AutomationModel<T>
  ) {
    super(width, height, tileset);
    this.model = model;
  }

  public getNeighbours(x: number, y: number): Neighbours<T> {
    const getValue: (value?: number) => T | null = (value?: number) => {
      if (typeof value === "undefined") {
        return null;
      }
      try {
        const item: T = this.tileset.getValue(value);
        return item;
      } catch (error) {
        if (error.message.match(/^the tile index should be a number between/)) {
          return null;
        }
        throw error;
      }
    };

    return {
      topLeft: getValue(this.tiles.get({ x: x - 1, y: y - 1 })),
      top: getValue(this.tiles.get({ x, y: y - 1 })),
      topRight: getValue(this.tiles.get({ x: x + 1, y: y - 1 })),
      left: getValue(this.tiles.get({ x: x - 1, y })),
      right: getValue(this.tiles.get({ x: x + 1, y })),
      bottomLeft: getValue(this.tiles.get({ x: x - 1, y: y + 1 })),
      bottom: getValue(this.tiles.get({ x, y: y + 1 })),
      bottomRight: getValue(this.tiles.get({ x: x + 1, y: y + 1 }))
    };
  }

  private step(): AutomataTilemap<T> {
    const current: (T | null)[] = this.toValues();
    const neighbourTuples: [T, Neighbours<T>][] = current.map(
      (item: T | null, index: number): [T, Neighbours<T>] => {
        return [
          item || this.tileset.getValue(0),
          this.getNeighbours(index % this.width, Math.floor(index / this.width))
        ];
      }
    );
    const processed: T[] = neighbourTuples.map(
      (tuple: [T, Neighbours<T>]): T => this.model.process(tuple[1], tuple[0])
    );
    return this.fromValues(processed);
  }

  public fromValues(src: T[]): AutomataTilemap<T> {
    super.fromValues(src);
    return this;
  }

  public generate(generations: number): AutomataTilemap<T> {
    let remainingGenerations: number = generations;
    while (--remainingGenerations >= 0) {
      this.step();
    }
    return this;
  }

  public noise(percentAlive: number): AutomataTilemap<T> {
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
          this.tileset.getIndex(
            this.model.live[Math.floor(Math.random() * this.model.live.length)]
          )
        );
      }

      while (source.length < length) {
        source.push(
          this.tileset.getIndex(
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
