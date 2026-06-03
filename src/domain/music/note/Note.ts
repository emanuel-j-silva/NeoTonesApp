export class Note {
  private static readonly NOTE_RANGE = 12;

  static readonly C = new Note(0, "C", "DO");
  static readonly C_SHARP = new Note(1, "C#", "DO#", "Db", "REb");
  static readonly D = new Note(2, "D", "RE");
  static readonly D_SHARP = new Note(3, "D#", "RE#", "Eb", "MIb");
  static readonly E = new Note(4, "E", "MI");
  static readonly F = new Note(5, "F", "FA");
  static readonly F_SHARP = new Note(6, "F#", "FA#", "Gb", "SOLb");
  static readonly G = new Note(7, "G", "SOL");
  static readonly G_SHARP = new Note(8, "G#", "SOL#", "Ab", "LAb");
  static readonly A = new Note(9, "A", "LA");
  static readonly A_SHARP = new Note(10, "A#", "LA#", "Bb", "SIb");
  static readonly B = new Note(11, "B", "SI");

  static readonly VALUES: readonly Note[] = [
    Note.C,
    Note.C_SHARP,
    Note.D,
    Note.D_SHARP,
    Note.E,
    Note.F,
    Note.F_SHARP,
    Note.G,
    Note.G_SHARP,
    Note.A,
    Note.A_SHARP,
    Note.B,
  ];

  private constructor(
    private readonly ordinal: number,
    private readonly letter: string,
    private readonly symbol: string,
    private readonly relativeFlatLetter?: string,
    private readonly relativeFlatSymbol?: string
  ) {}

  getOrdinal(): number {
    return this.ordinal;
  }

  getLetter(): string {
    return this.letter;
  }

  getSymbol(): string {
    return this.symbol;
  }

  getRelativeFlatLetter(): string | undefined {
    return this.relativeFlatLetter;
  }

  getRelativeFlatSymbol(): string | undefined {
    return this.relativeFlatSymbol;
  }

  transpose(semitones: number): Note {
    const normalizedSemitones = semitones % Note.NOTE_RANGE;

    let index = (this.ordinal + normalizedSemitones) % Note.NOTE_RANGE;

    if (index < 0) {
      index += Note.NOTE_RANGE;
    }

    return Note.VALUES[index];
  }

  equalsNote(other: Note | null | undefined): boolean {
    if (!other) {
      return false;
    }

    return (
      this.letter === other.letter ||
      this.symbol === other.symbol
    );
  }

  toString(): string {
    return `Note{letter='${this.letter}', symbol='${this.symbol}'}`;
  }
}