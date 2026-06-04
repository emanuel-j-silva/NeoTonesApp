import { Arrangement } from "./Arrangement";

export class Music {

  constructor(
    readonly id: string,
    readonly title: string,
    readonly arrangement: Arrangement
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

  equals(other: Music): boolean {
    return this.id === other.id;
  }

  toString(): string {
    return `Music(${this.title})`;
  }
}