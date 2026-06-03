import { MusicComponent } from "./MusicComponent";

export class MusicalPhrase implements MusicComponent {

  readonly components: readonly MusicComponent[];

  constructor(
    components: readonly MusicComponent[]
  ) {

    if (!components) {
      throw new Error("Musical phrase can't contain null components");
    }

    if (components.some(component => component == null)) {
      throw new Error("Musical phrase can't contain null components");
    }

    this.components = [...components];
  }

  static empty(): MusicalPhrase {
    return new MusicalPhrase([]);
  }

  withAddedComponent(component: MusicComponent): MusicalPhrase {

    if (!component) {
      throw new Error("Can't add null to components list");
    }

    if (component === this) {
      throw new Error("A component cannot contain itself");
    }

    return new MusicalPhrase([...this.components,component]);
  }

  withAddedComponents(components: readonly MusicComponent[]): MusicalPhrase {

    if (!components) {
      throw new Error(
        "Unable to add null components list"
      );
    }

    if (components.some(component => component == null)) {
      throw new Error(
        "Unable to add null in components list"
      );
    }

    if (components.some(component => component === this)) {
      throw new Error(
        "A component cannot contain itself"
      );
    }

    return new MusicalPhrase([...this.components,...components]);
  }

  withoutComponentAt(index: number): MusicalPhrase {
    if (index < 0 ||index >= this.components.length) {
      throw new Error(
        "Component not found with this index"
      );
    }

    return new MusicalPhrase(
        this.components.filter(
        (_, i) => i !== index
      )
    );
  }

  shiftTone(semitones: number): MusicalPhrase {
    return new MusicalPhrase(
      this.components.map(component =>
        component.shiftTone(semitones)
      )
    );
  }

  equals(other: MusicalPhrase): boolean {

  if (!other) {
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
        other.components[index] as any
      )
  );
}

  toString(): string {
    return `MusicalPhrase(${this.components.length} components)`;
  }
}