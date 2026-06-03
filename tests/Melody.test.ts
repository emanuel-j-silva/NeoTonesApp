import { describe, expect, test, beforeEach } from "vitest";

import { Melody } from "../src/domain/music/components/Melody";
import { Note } from "../src/domain/music/note/Note";

describe("Melody", () => {

  let melody: Melody;

  beforeEach(() => {
    melody = new Melody([
      Note.G,
      Note.A,
      Note.B
    ]);
  });

  describe("shiftTone", () => {

    test("should return correct minimum transposition", () => {

      const transposed = melody.shiftTone(1);

      expect(
        transposed.equals(
          new Melody([
            Note.G_SHARP,
            Note.A_SHARP,
            Note.C
          ])
        )
      ).toBe(true);
    });

    test("should return correct maximum transposition", () => {

      const transposed = melody.shiftTone(11);

      expect(
        transposed.equals(
          new Melody([
            Note.F_SHARP,
            Note.G_SHARP,
            Note.A_SHARP
          ])
        )
      ).toBe(true);
    });

    test("should return correct minimum negative transposition", () => {

      const transposed = melody.shiftTone(-1);

      expect(
        transposed.equals(
          new Melody([
            Note.F_SHARP,
            Note.G_SHARP,
            Note.A_SHARP
          ])
        )
      ).toBe(true);
    });

    test("should return correct maximum negative transposition", () => {

      const transposed = melody.shiftTone(-11);

      expect(
        transposed.equals(
          new Melody([
            Note.G_SHARP,
            Note.A_SHARP,
            Note.C
          ])
        )
      ).toBe(true);
    });

    test("should return equal melody on zero transpose", () => {

      const transposed = melody.shiftTone(0);

      expect(
        transposed.equals(melody)
      ).toBe(true);
    });

  });

  describe("immutability", () => {

    test("should create new melody when adding note", () => {

      const updated =
        melody.withAddedNote(Note.C);

      expect(updated.notes.length)
        .toBe(4);

      expect(melody.notes.length)
        .toBe(3);
    });

    test("should create new melody when removing note", () => {

      const updated =
        melody.withoutNoteAt(1);

      expect(updated.notes.length)
        .toBe(2);

      expect(melody.notes.length)
        .toBe(3);
    });

    test("should preserve original melody after transpose", () => {

      melody.shiftTone(2);

      expect(
        melody.equals(
          new Melody([
            Note.G,
            Note.A,
            Note.B
          ])
        )
      ).toBe(true);
    });

  });

  describe("validation", () => {

    test("should block null constructor", () => {

      expect(
        () => new Melody(null as any)
      ).toThrow();
    });

    test("should block null notes", () => {

      expect(
        () =>
          new Melody([
            Note.C,
            null as any
          ])
      ).toThrow();
    });

    test("should block null addition", () => {

      expect(
        () =>
          melody.withAddedNote(null as any)
      ).toThrow();
    });

    test("should block invalid remove index", () => {

      expect(
        () =>
          melody.withoutNoteAt(5)
      ).toThrow();
    });

  });

});