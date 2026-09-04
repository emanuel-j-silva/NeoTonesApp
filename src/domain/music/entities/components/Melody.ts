import { Note } from "../note/Note";
import { MusicComponent } from "./MusicComponent";

export class Melody implements MusicComponent {

  readonly notes: readonly Note[];
  readonly annotation?: string;

  constructor(notes: readonly Note[], annotation?: string) {
    if (!notes) {
      throw new Error("Melody can't contain null notes");
    }

    if (notes.some(note => note == null)) {
      throw new Error("Melody can't contain null notes");
    }

    this.notes = [...notes];
    this.annotation = annotation;
  }

  static empty(): Melody {
    return new Melody([]);
  }

  withAddedNote(note: Note): Melody {
    if (!note) {
      throw new Error("Unable to add null note");
    }

    return new Melody([...this.notes, note], this.annotation);
  }

  withAddedNotes(...notes: Note[]): Melody {
    if (notes.some(note => note == null)) {
      throw new Error("Unable to add null notes");
    }

    return new Melody([...this.notes, ...notes], this.annotation);
  }

  withoutNoteAt(index: number): Melody {
    if (index < 0 || index >= this.notes.length) {
      throw new Error("Note not found with this index");
    }
    return new Melody(this.notes.filter((_, i) => i !== index), this.annotation);
  }

  shiftTone(semitones: number): Melody {
    return new Melody(
      this.notes.map(note => note.transpose(semitones)),
      this.annotation
    );
  }

  equals(other: Melody): boolean {
    if (!other) {
      return false;
    }

    if (this.notes.length !== other.notes.length) {
      return false;
    }

    if (this.annotation !== other.annotation) {
      return false;
    }

    return this.notes.every(
      (note, index) => note === other.notes[index]
    );
  }

  toString(): string {
    const ann = this.annotation ? ` ${this.annotation}` : "";
    return `Melody(${this.notes.map(n => n.getLetter()).join(", ")}${ann})`;
  }
}