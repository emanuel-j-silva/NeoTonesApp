import { Arrangement } from "./Arrangement";

export class Music {

  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly arrangement: Arrangement
  ) {

    if (!id) {
      throw new Error("Id can't be null");
    }

    if (!title) {
      throw new Error("Title can't be null");
    }

    if (!arrangement) {
      throw new Error(
        "Arrangement can't be null"
      );
    }
  }

  getId(): string{
    return this.id;
  }

  getTitle(): string{
    return this.title;
  }

  getArrangement(): Arrangement{
    return this.arrangement;
  }

  equals(other: Music): boolean {
    return this.id === other.id;
  }

  toString(): string {
    return `Music(${this.title})`;
  }
}