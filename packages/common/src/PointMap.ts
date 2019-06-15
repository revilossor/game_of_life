import Point from "./Point";

interface GenericPointMap<T> {
  items: {
    [hash: string]: T;
  };
  get: (point: Point) => T;
  set: (point: Point, item: T) => T;
}

export default class PointMap<T> implements GenericPointMap<T> {
  public items: { [hash: string]: T } = {};

  private hash(point: Point): string {
    return JSON.stringify(point);
  }

  get length(): number {
    return Object.keys(this.items).length;
  }

  public get(point: Point): T {
    return this.items[this.hash(point)];
  }

  public set(point: Point, value: T): T {
    this.items[this.hash(point)] = value;
    return value;
  }
}
