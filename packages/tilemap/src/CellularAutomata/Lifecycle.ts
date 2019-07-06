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

  private getLiveNeighbours(neighbours: Neighbours): number {
    let lives = 0;
    Object.values(neighbours).forEach((value: T): void => {
      if (~this.live.indexOf(value)) {
        ++lives;
      }
    });
    return lives;
  }

  public process(neighbours: Neighbours): T {
    const lives = this.getLiveNeighbours(neighbours);
    return ~this.born.indexOf(lives) || ~this.survive.indexOf(lives)
      ? this.liveValue
      : this.deadValue;
  }
}
