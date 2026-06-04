import { describe, expect, test, beforeEach } from "vitest";

import { Arrangement } from "../src/domain/music/Arrangement";
import { Melody } from "../src/domain/music/components/Melody";
import { Phrase } from "../src/domain/music/components/Phrase";
import { Note } from "../src/domain/music/note/Note";
import { ScaleType } from "../src/domain/music/note/ScaleType";
import { Tone } from "../src/domain/music/note/Tone";

describe("Arrangement", () => {

  const tone = new Tone(
    Note.C,
    ScaleType.MAJOR
  );

  test("should block null tone", () => {

    expect(
      () =>
        new Arrangement(
          null as any,
          []
        )
    ).toThrow();
  });

  test("should block null components", () => {

    expect(
      () =>
        new Arrangement(
          tone,
          null as any
        )
    ).toThrow();
  });

  test("should block null component inside list", () => {

    expect(
      () =>
        new Arrangement(
          tone,
          [
            new Phrase("test"),
            null as any
          ]
        )
    ).toThrow();
  });

  test("should return true on equals", () => {

    const a1 =
      new Arrangement(
        tone,
        [
          new Phrase("test")
        ]
      );

    const a2 =
      new Arrangement(
        tone,
        [
          new Phrase("test")
        ]
      );

    expect(
      a1.equals(a2)
    ).toBe(true);
  });

  test("should return false on equals", () => {

    const a1 =
      new Arrangement(
        tone,
        [
          new Phrase("test")
        ]
      );

    const a2 =
      new Arrangement(
        new Tone(
          Note.D,
          ScaleType.MAJOR
        ),
        [
          new Phrase("test")
        ]
      );

    expect(
      a1.equals(a2)
    ).toBe(false);
  });

  test("should transpose arrangement correctly", () => {

    const original =
      new Arrangement(
        new Tone(
          Note.C,
          ScaleType.MAJOR
        ),
        [
          new Phrase("Test"),
          new Melody([
            Note.C,
            Note.D,
            Note.E
          ])
        ]
      );

    const transposed =
      original.transposeTo(
        new Tone(
          Note.D,
          ScaleType.MAJOR
        )
      );

    const expected =
      new Arrangement(
        new Tone(
          Note.D,
          ScaleType.MAJOR
        ),
        [
          new Phrase("Test"),
          new Melody([
            Note.D,
            Note.E,
            Note.F_SHARP
          ])
        ]
      );

    expect(
      transposed.equals(expected)
    ).toBe(true);
  });

  test("should keep original arrangement immutable", () => {

    const original =
      new Arrangement(
        new Tone(
          Note.C,
          ScaleType.MAJOR
        ),
        [
          new Melody([
            Note.C,
            Note.D
          ])
        ]
      );

    const transposed =
      original.transposeTo(
        new Tone(
          Note.D,
          ScaleType.MAJOR
        )
      );

    expect(
      original.equals(transposed)
    ).toBe(false);
    expect(
      original.getTone().equals(
        new Tone(
          Note.C,
          ScaleType.MAJOR
        )
      )
    ).toBe(true);
  });

});