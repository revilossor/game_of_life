import Point from "./Point";

interface HashMap<K, T> {
  items: {
    [hash: string]: T;
  };
  hash: (item: K) => string;
  unhash: (hash: string) => K;
  get: (unhashed: K) => T;
  set: (unhashed: K, item: T) => T;
  length: number;
  entries: [K, T][];
}

export default class PointMap<T> implements HashMap<Point, T> {
  public items: { [hash: string]: T } = {};

  public get length(): number {
    return Object.keys(this.items).length;
  }

  public get entries(): [Point, T][] {
    return Object.entries(this.items).map(([hash, value]) => [
      this.unhash(hash),
      value
    ]);
  }

  public hash(item: Point): string {
    return JSON.stringify(item);
  }

  public unhash(hash: string): Point {
    return JSON.parse(hash);
  }

  public get(unhashed: Point): T {
    return this.items[this.hash(unhashed)];
  }

  public set(unhashed: Point, value: T): T {
    this.items[this.hash(unhashed)] = value;
    return value;
  }
}
