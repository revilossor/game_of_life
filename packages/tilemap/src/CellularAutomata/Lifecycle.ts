import Neighbours from "./Neighbours";

export default class Lifecycle<T> {
  public constructor(
    public live: T[],
    public dead: T[],
    public born: number[],
    public survive: number[]
  ) {}

  public get liveValue(): T {
    return this.live[Math.floor(Math.random() * this.live.length)];
  }

  public get deadValue(): T {
    return this.dead[Math.floor(Math.random() * this.dead.length)];
  }

  private getLiveNeighbours(neighbours: Neighbours<T>): number {
    let lives = 0;
    Object.values(neighbours).forEach((value: T): void => {
      if (this.live.indexOf(value) > -1) {
        ++lives;
      }
    });
    return lives;
  }

  public process(neighbours: Neighbours<T>, value: T): T {
    const lives = this.getLiveNeighbours(neighbours);
    const getLiveIf = (): T => {
      if (typeof value === "undefined") {
        return this.liveValue;
      }
      return this.live.indexOf(value) >= 0 ? value : this.liveValue;
    };
    const getDeadIf = (): T => {
      if (typeof value === "undefined") {
        return this.deadValue;
      }
      return this.dead.indexOf(value) >= 0 ? value : this.deadValue;
    };
    if (this.born.indexOf(lives) >= 0) {
      return getLiveIf();
    }
    if (this.live.indexOf(value) >= 0 && this.survive.indexOf(lives) >= 0) {
      return getLiveIf();
    }
    return getDeadIf();
  }
}
