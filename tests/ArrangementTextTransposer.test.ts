import { describe, expect, test } from "vitest";
import { ArrangementTextTransposer } from "../src/domain/music/usecases/ArrangementTextTransposer";
import { Tone } from "../src/domain/music/entities/note/Tone";
import { Note } from "../src/domain/music/entities/note/Note";
import { ScaleType } from "../src/domain/music/entities/note/ScaleType";

describe("ArrangementTextTransposer", () => {
  test("should transpose chords and notes inside brackets correctly", () => {
    const text = "[INTRO]\n[F#] [B] [A#]\nUm [B] grande sinal";
    const fromTone = new Tone(Note.A, ScaleType.MINOR);
    const toTone = new Tone(Note.B, ScaleType.MINOR);

    const transposed = ArrangementTextTransposer.transpose(text, fromTone, toTone);

    expect(transposed).toContain("[G#]");
    expect(transposed).toContain("[C#]");
    expect(transposed).toContain("[C]");
    expect(transposed).toContain("Um [C#] grande sinal");
  });

  test("should transpose Portuguese solfege notes correctly", () => {
    const text = "[INTRO]\n[Fa#] [Si] [La#]\nUm [Si] grande sinal";
    const fromTone = new Tone(Note.A, ScaleType.MINOR);
    const toTone = new Tone(Note.B, ScaleType.MINOR);

    const transposed = ArrangementTextTransposer.transpose(text, fromTone, toTone);

    expect(transposed).toContain("[Sol#]");
    expect(transposed).toContain("[Do#]");
    expect(transposed).toContain("[Do]");
    expect(transposed).toContain("Um [Do#] grande sinal");
  });
});
