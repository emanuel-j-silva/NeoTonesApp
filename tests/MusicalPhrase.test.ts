import { describe, expect, test, beforeEach } from "vitest";

import { MusicalPhrase } from "../src/domain/music/components/MusicalPhrase";
import { Phrase } from "../src/domain/music/components/Phrase";
import { Melody } from "../src/domain/music/components/Melody";
import { Note } from "../src/domain/music/note/Note";

describe("MusicalPhrase", () => {
    
    test("should block null components", () => {
        expect(
            () =>
                new MusicalPhrase(null as any)
        ).toThrow();
    });

    test("should block null component", () => {
        expect(
            () =>
      new MusicalPhrase([new Phrase("test"), null as any])
        ).toThrow();
    });

    test("should create new phrase with added component", () => {
        const phrase = MusicalPhrase.empty();
        const updated = phrase.withAddedComponent(new Phrase("test"));
        
        expect(updated.components.length).toBe(1);
        expect(phrase.components.length).toBe(0);
    });

    test("should create new phrase without component", () => {
        const phrase = new MusicalPhrase([
            new Phrase("A"),
            new Phrase("B")
        ]);
        const updated = phrase.withoutComponentAt(0);
        
        expect(updated.components.length).toBe(1);
        expect(phrase.components.length).toBe(2);
    });

    test("should transpose all nested components", () => {
        const phrase = new Phrase("Test");
        const melody = new Melody([
            Note.C,
            Note.D,
            Note.E
        ]);
        const childPhrase = new Phrase("Another test");
        const childMelody = new Melody([
            Note.A,
            Note.B,
            Note.C
        ]);
        const childComposite = new MusicalPhrase([
            childPhrase,
            childMelody
        ]);
        const musicalPhrase = new MusicalPhrase([
            phrase,
            melody,
            childComposite
        ]);
        const transposed = musicalPhrase.shiftTone(2);
        
        expect(
            transposed.equals(
                new MusicalPhrase([phrase,
                    new Melody([
                        Note.D,
                        Note.E,
                        Note.F_SHARP
                    ]),
                    new MusicalPhrase([
                        childPhrase,
                        new Melody([
                            Note.B,
                            Note.C_SHARP,
                            Note.D
                        ])
                    ])
                ])
            )
        ).toBe(true); 
    });
})