import { MusicComponent } from "./MusicComponent";

export class Section implements MusicComponent {
  constructor(readonly title: string) {
    if (!title) {
      throw new Error("Section title can't be null");
    }
  }

  shiftTone(_: number): Section {
    return this;
  }

  equals(other: Section): boolean {
    if (!other || !(other instanceof Section)) {
      return false;
    }
    return this.title === other.title;
  }

  toString(): string {
    return `Section(${this.title})`;
  }
}
