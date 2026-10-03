import { MusicComponent } from "./components/MusicComponent";
import { Tone } from "./note/Tone";
import { ArrangementBlock } from "./ArrangementBlock";

export class Arrangement {

  readonly tone: Tone;
  readonly components: readonly MusicComponent[];
  readonly blocks: readonly ArrangementBlock[];

  constructor(
    tone: Tone,
    components: readonly MusicComponent[] = [],
    blocks: readonly ArrangementBlock[] = []
  ) {

    if (!tone) {
      throw new Error("Tone can't be null");
    }

    if (!components) {
      throw new Error("Components can't be null");
    }

    if (!blocks) {
      throw new Error("Blocks can't be null");
    }

    if (components.some(component => component == null)) {
      throw new Error("Components can't contain null values");
    }

    if (blocks.some(block => block == null)) {
      throw new Error("Blocks can't contain null values");
    }

    this.tone = tone;
    this.components = Object.freeze([...components]);
    this.blocks = Object.freeze([...blocks]);
  }

  static empty(tone: Tone, blocks: readonly ArrangementBlock[] = []): Arrangement {
    return new Arrangement(tone, [], blocks);
  }

  transposeTo(pretendedTone: Tone): Arrangement {
    const transposedBlocks = this.blocks.map(block => block.transpose(this.tone, pretendedTone));
    return new Arrangement(pretendedTone, [...this.components], transposedBlocks);
  }

  equals(other: Arrangement): boolean {

    if (!other) {
      return false;
    }

    if (!this.tone.equals(other.tone)) {
      return false;
    }

    if (this.blocks.length !== other.blocks.length) {
      return false;
    }

    return this.blocks.every(
      (block, index) =>
        block.equals(
          other.blocks[index]
        )
    );
  }

  getTone(): Tone {
    return this.tone;
  }

  getBlocks(): readonly ArrangementBlock[] {
    return this.blocks;
  }

  toString(): string {
    return `Arrangement(${this.tone.toString()}, ${this.blocks.length} blocks)`;
  }
}
