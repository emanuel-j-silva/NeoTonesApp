import { describe, expect, test } from "vitest";
import { Note } from "../src/domain/music/note/Note";

describe("Note", () => {
  test("should return correct note on non-circular transposition", () => {
    const note = Note.C;
    const transposedNote = note.transpose(3);

    expect(transposedNote).toBe(Note.D_SHARP);
    expect(transposedNote.getOrdinal()).toBe(3);
  });

  test("should return correct note on simple circular transposition", () => {
    const note = Note.A;
    const transposedNote = note.transpose(5);

    expect(transposedNote).toBe(Note.D);
    expect(transposedNote.getOrdinal()).toBe(2);
  });

  test("should return the correct note in more than one turn in the range of notes", () => {
    const note = Note.A;
    const transposedNote = note.transpose(17);

    expect(transposedNote).toBe(Note.D);
    expect(transposedNote.getOrdinal()).toBe(2);
  });

  test("should return the correct note in exactly one turn in the range of notes", () => {
    const note = Note.F;
    const transposedNote = note.transpose(12);

    expect(transposedNote).toBe(note);
    expect(transposedNote.getOrdinal()).toBe(5);
  });

  test("should return the same note in zero semitones", () => {
    const note = Note.E;
    const transposedNote = note.transpose(0);

    expect(transposedNote).toBe(note);
    expect(transposedNote.getOrdinal()).toBe(4);
  });

  test("should return the correct note in maximum semitone transposition", () => {
    const note = Note.C;
    const transposedNote = note.transpose(11);

    expect(transposedNote).toBe(Note.B);
    expect(transposedNote.getOrdinal()).toBe(11);
  });

  test("should return the correct note in minimum semitone transposition", () => {
    const note = Note.G;
    const transposedNote = note.transpose(1);

    expect(transposedNote).toBe(Note.G_SHARP);
    expect(transposedNote.getOrdinal()).toBe(8);
  });

  test("should return the correct note in several turns on the range of notes", () => {
    const note = Note.F;
    const transposedNote = note.transpose(40);

    expect(transposedNote).toBe(Note.A);
    expect(transposedNote.getOrdinal()).toBe(9);
  });

  test("should return the correct note in more than one exact turn around the range of notes", () => {
    const note = Note.F_SHARP;
    const transposedNote = note.transpose(72);

    expect(transposedNote).toBe(note);
    expect(transposedNote.getOrdinal()).toBe(6);
  });

  test("should return correct note on non-circular negative transpose", () => {
    const note = Note.D_SHARP;
    const transposedNote = note.transpose(-3);

    expect(transposedNote).toBe(Note.C);
    expect(transposedNote.getOrdinal()).toBe(0);
  });

  test("should return correct note on simple circular negative transpose", () => {
    const note = Note.D;
    const transposedNote = note.transpose(-5);

    expect(transposedNote).toBe(Note.A);
    expect(transposedNote.getOrdinal()).toBe(9);
  });

  test("should return the correct note in more than one negative turn in the range of notes", () => {
    const note = Note.D;
    const transposedNote = note.transpose(-17);

    expect(transposedNote).toBe(Note.A);
    expect(transposedNote.getOrdinal()).toBe(9);
  });

  test("should return the correct note in exactly one negative turn in the range of notes", () => {
    const note = Note.F;
    const transposedNote = note.transpose(-12);

    expect(transposedNote).toBe(note);
    expect(transposedNote.getOrdinal()).toBe(5);
  });

  test("should return the correct note in maximum negative semitone transposition", () => {
    const note = Note.C;
    const transposedNote = note.transpose(-11);

    expect(transposedNote).toBe(Note.C_SHARP);
    expect(transposedNote.getOrdinal()).toBe(1);
  });

  test("should return the correct note in minimum negative semitone transposition", () => {
    const note = Note.G;
    const transposedNote = note.transpose(-1);

    expect(transposedNote).toBe(Note.F_SHARP);
    expect(transposedNote.getOrdinal()).toBe(6);
  });

  test("should return the correct note in several turns on the range of notes", () => {
    const note = Note.F;
    const transposedNote = note.transpose(-40);

    expect(transposedNote).toBe(Note.C_SHARP);
    expect(transposedNote.getOrdinal()).toBe(1);
  });

  test("should return the correct note in more than one exact turn around the range of notes", () => {
    const note = Note.F_SHARP;
    const transposedNote = note.transpose(-72);

    expect(transposedNote).toBe(note);
    expect(transposedNote.getOrdinal()).toBe(6);
  });

  test("should return true for comparing equal notes", () => {
    expect(Note.G.equalsNote(Note.G)).toBe(true);
  });

  test("should return false for comparing different notes", () => {
    expect(Note.G.equalsNote(Note.E)).toBe(false);
  });

  test("should return false when comparing null note", () => {
    expect(Note.G.equalsNote(null)).toBe(false);
  });

  test("should return correct relative flat", () => {
    const note = Note.C_SHARP;
    const note2 = note.transpose(2);

    expect(note.getRelativeFlatSymbol()).toBe("REb");
    expect(note.getRelativeFlatLetter()).toBe("Db");
    expect(note.getSymbol()).toBe("DO#");
    expect(note.getLetter()).toBe("C#");

    expect(note2.getRelativeFlatSymbol()).toBe("MIb");
    expect(note2.getRelativeFlatLetter()).toBe("Eb");
    expect(note2.getSymbol()).toBe("RE#");
    expect(note2.getLetter()).toBe("D#");
  });
});