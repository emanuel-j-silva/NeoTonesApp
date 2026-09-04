import { describe, expect, test } from "vitest";
import { Section } from "../src/domain/music/entities/components/Section";

describe("Section", () => {
  test("should create section with title", () => {
    const section = new Section("INTRO");
    expect(section.title).toBe("INTRO");
  });

  test("should throw error if title is empty", () => {
    expect(() => new Section("")).toThrow("Section title can't be null");
  });

  test("should return same instance on shiftTone", () => {
    const section = new Section("REFRÃO");
    expect(section.shiftTone(2)).toBe(section);
  });

  test("should compare equality correctly", () => {
    const s1 = new Section("SOLO");
    const s2 = new Section("SOLO");
    const s3 = new Section("INTRO");

    expect(s1.equals(s2)).toBe(true);
    expect(s1.equals(s3)).toBe(false);
  });
});
