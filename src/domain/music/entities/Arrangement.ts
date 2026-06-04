import { MusicComponent } from "./components/MusicComponent";
import { Tone } from "./note/Tone";

export class Arrangement {

  readonly tone: Tone;
  readonly components: readonly MusicComponent[];

  constructor(
    tone: Tone,
    components: readonly MusicComponent[] = []
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

    this.tone = tone;
    this.components = Object.freeze([...components]);
  }

  static empty(tone: Tone): Arrangement {
    return new Arrangement(tone);
  }

  withAddedComponent(
    component: MusicComponent
  ): Arrangement {

    if (!component) {
      throw new Error(
        "Can't add null components in arrangement"
      );
    }

    return new Arrangement(
      this.tone,
      [...this.components, component]
    );
  }

  withAddedComponents(
    components: readonly MusicComponent[]
  ): Arrangement {

    if (!components) {
      throw new Error(
        "Can't add null components in arrangement"
      );
    }

    if (components.some(component => component == null)) {
      throw new Error(
        "Can't add null components in arrangement"
      );
    }

    return new Arrangement(
      this.tone,
      [...this.components, ...components]
    );
  }

  withoutComponentAt(
    index: number
  ): Arrangement {

    if (
      index < 0 ||
      index >= this.components.length
    ) {
      throw new Error(
        "Component not found with this index"
      );
    }

    return new Arrangement(
      this.tone,
      this.components.filter(
        (_, i) => i !== index
      )
    );
  }

  transposeTo(pretendedTone: Tone): Arrangement {

    const semitones = pretendedTone.getNote().getOrdinal() - this.tone.getNote().getOrdinal();

    return new Arrangement(pretendedTone, this.components
        .map(component =>
            component.shiftTone(semitones)
        )
    );
  }

  equals(other: Arrangement): boolean {

    if (!other) {
      return false;
    }

    if (!this.tone.equals(other.tone)) {
      return false;
    }

    if (
      this.components.length !==
      other.components.length
    ) {
      return false;
    }

    return this.components.every(
      (component, index) =>
        component.equals(
          other.components[index]
        )
    );
  }

  getTone(): Tone {
    return this.tone
  }

  toString(): string {
    return `Arrangement(${this.tone.toString()}, ${this.components.length} components)`;
  }
}