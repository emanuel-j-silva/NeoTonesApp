import { MusicComponent } from "./MusicComponent";

export class Phrase implements MusicComponent {

  constructor(
    readonly phrase: string
  ) {
    if (!phrase) {
      throw new Error("Phrase can't be null");
    }
  }

  shiftTone(_: number): Phrase {
    return this;
  }

  equals(other: Phrase): boolean {
    return this.phrase === other.phrase;
  }

  toString(): string {
    return `Phrase(${this.phrase})`;
  }
}