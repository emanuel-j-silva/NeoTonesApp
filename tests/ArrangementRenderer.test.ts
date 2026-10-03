import { describe, expect, test } from "vitest";
import { Arrangement } from "../src/domain/music/entities/Arrangement";
import { Phrase } from "../src/domain/music/entities/components/Phrase";
import { Melody } from "../src/domain/music/entities/components/Melody";
import { Note } from "../src/domain/music/entities/note/Note";
import { ScaleType } from "../src/domain/music/entities/note/ScaleType";
import { Tone } from "../src/domain/music/entities/note/Tone";
import { ArrangementRenderer } from "../src/app/view-model/ArrangementRenderer";
import { ArrangementLayout } from "../src/presentation/layout/ArrangementLayoutMap";

describe("ArrangementRenderer", () => {
  test("should render annotated phrases with notePositions correctly", () => {
    const phraseText = "Uma mulher vestida de sol";
    const arrangement = new Arrangement(
      new Tone(Note.A, ScaleType.MINOR),
      [
        new Phrase(phraseText),
        new Melody([Note.B, Note.D, Note.C_SHARP])
      ]
    );

    const layout: ArrangementLayout = {
      musicTitle: "Test Song",
      phraseLayouts: [
        {
          phraseText: phraseText,
          notePositions: [
            { noteIndex: 0, charIndex: 0 },
            { noteIndex: 1, charIndex: 4 },
            { noteIndex: 2, charIndex: 12 },
          ],
        },
      ],
    };

    const renderedLines = ArrangementRenderer.render(arrangement, layout);

    expect(renderedLines.length).toBe(1);
    expect(renderedLines[0].type).toBe("annotated-phrase");
    expect(renderedLines[0].notePositions).toBeDefined();
    expect(renderedLines[0].notePositions!.length).toBe(3);
  });
});
