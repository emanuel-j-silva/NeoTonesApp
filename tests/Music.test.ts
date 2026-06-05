import * as Crypto from "expo-crypto"

import { describe, expect, test } from "vitest";

import { Arrangement } from "../src/domain/music/entities/Arrangement";
import { Music } from "../src/domain/music/entities/Music";
import { Note } from "../src/domain/music/entities/note/Note";
import { ScaleType } from "../src/domain/music/entities/note/ScaleType";
import { Tone } from "../src/domain/music/entities/note/Tone";

describe("Music", () => {

  const arrangement =
    new Arrangement(
      new Tone(
        Note.C,
        ScaleType.MAJOR
      )
    );

  test("should create music", () => {

    const music =
      new Music(
        Crypto.randomUUID(),
        "Amazing Grace",
        arrangement
      );

    expect(
      music.title
    ).toBe("Amazing Grace");

    expect(
      music.arrangement
    ).toBe(arrangement);
  });

  test("should block null id", () => {

    expect(
      () =>
        new Music(
          "" as any,
          "Amazing Grace",
          arrangement
        )
    ).toThrow();
  });

  test("should block null title", () => {

    expect(
      () =>
        new Music(
          Crypto.randomUUID(),
          "" as any,
          arrangement
        )
    ).toThrow();
  });

  test("should block null arrangement", () => {

    expect(
      () =>
        new Music(
          Crypto.randomUUID(),
          "Amazing Grace",
          null as any
        )
    ).toThrow();
  });

  test("should return true for same id", () => {

    const id =
      Crypto.randomUUID();

    const music1 =
      new Music(
        id,
        "Amazing Grace",
        arrangement
      );

    const music2 =
      new Music(
        id,
        "Different Title",
        arrangement
      );

    expect(
      music1.equals(music2)
    ).toBe(true);
  });

  test("should return false for different ids", () => {

    const music1 =
      new Music(
        Crypto.randomUUID(),
        "Amazing Grace",
        arrangement
      );

    const music2 =
      new Music(
        Crypto.randomUUID(),
        "Amazing Grace",
        arrangement
      );

    expect(
      music1.equals(music2)
    ).toBe(false);
  });

});