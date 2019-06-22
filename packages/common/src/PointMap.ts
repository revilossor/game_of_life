import Point from "./Point";

interface HashMap<K, T> {
  items: {
    [hash: string]: T;
  };
  get: (unhashed: K) => T;
  set: (unhashed: K, item: T) => T;
}

export default class PointMap<T> implements HashMap<Point, T> {
  public items: { [hash: string]: T } = {};

  get length(): number {
    return Object.keys(this.items).length;
  }

  private hash(point: Point): string {
    return JSON.stringify(point);
  }

  public get(unhashed: Point): T {
    return this.items[this.hash(unhashed)];
  }

  public set(unhashed: Point, value: T): T {
    this.items[this.hash(unhashed)] = value;
    return value;
  }
}
