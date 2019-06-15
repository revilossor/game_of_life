interface Point {
  x: number;
  y: number;
}

export default class Level {
  private player: Point = { x: 0, y: 0 };

  private poo: string;

  public constructor(poo: string) {
    this.poo = poo;
  }

  public print(): void {
    // eslint-disable-next-line no-console
    console.dir({
      player: this.player,
      poo: this.poo
    });
  }
}
