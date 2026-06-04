import { Note } from "./Note";
import { ScaleType } from "./ScaleType";

export class Tone {
  constructor(
    readonly note: Note,
    readonly scaleType: ScaleType
  ) {}
  
  public getNote() : Note {
    return this.note
  }

  public getScaleType() : ScaleType {
    return this.scaleType
  }

  equals(other: Tone): boolean {
    return (
      this.note === other.note &&
      this.scaleType === other.scaleType
    );
  }

  toString(): string {
    return `Tone(${this.note}, ${ScaleType[this.scaleType]})`;
  }
}