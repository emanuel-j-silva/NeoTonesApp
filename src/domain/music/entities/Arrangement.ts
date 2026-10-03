import { MusicComponent } from "./components/MusicComponent";
import { Tone } from "./note/Tone";
import { ArrangementTextTransposer } from "../usecases/ArrangementTextTransposer";

export class Arrangement {

  readonly tone: Tone;
  readonly components: readonly MusicComponent[];
  readonly textContent: string;

  constructor(
    tone: Tone,
    components: readonly MusicComponent[] = [],
    textContent: string = ""
  ) {

    if (!tone) {
      throw new Error("Tone can't be null");
    }

    if (!components) {
      throw new Error("Components can't be null");
    }

    if (components.some(component => component == null)) {
      throw new Error("Components can't contain null values");
    }

    if (textContent == null) {
      throw new Error("Text content can't be null");
    }

    this.tone = tone;
    this.components = Object.freeze([...components]);
    this.textContent = textContent;
  }

  static empty(tone: Tone, textContent: string = ""): Arrangement {
    return new Arrangement(tone, [], textContent);
  }

  transposeTo(pretendedTone: Tone): Arrangement {
    if (this.textContent) {
      const transposedText = ArrangementTextTransposer.transpose(
        this.textContent,
        this.tone,
        pretendedTone
      );
      return new Arrangement(pretendedTone, [...this.components], transposedText);
    }

    const semitones = pretendedTone.getNote().getOrdinal() - this.tone.getNote().getOrdinal();

    return new Arrangement(pretendedTone, this.components
        .map(component =>
            component.shiftTone(semitones)
        ), this.textContent);
  }

  equals(other: Arrangement): boolean {
    if (!other) return false;
    if (!this.tone.equals(other.tone)) return false;
    if (this.textContent !== other.textContent) return false;
    return true;
  }

  getTone(): Tone {
    return this.tone;
  }

  getTextContent(): string {
    return this.textContent;
  }

  toString(): string {
    return `Arrangement(${this.tone.toString()}, text length: ${this.textContent.length})`;
  }
}
