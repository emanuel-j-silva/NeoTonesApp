import { ArrangementLayout } from "./ArrangementLayoutMap";
import { LayoutProvider } from "./LayoutProvider";

/**
 * Provider de layout em memória com posições de notas originais
 * gravadas em relação à frase da música.
 */
export class InMemoryLayoutProvider implements LayoutProvider {

    private readonly layouts = new Map<string, ArrangementLayout>([
        [
            "Um Grande Sinal",
            {
                musicTitle: "Um Grande Sinal",
                phraseLayouts: [
                    {
                        phraseText: "Um Grande sinal…",
                        notePositions: [
                            { noteIndex: 0, charIndex: 20 },
                            { noteIndex: 1, charIndex: 23 },
                            { noteIndex: 2, charIndex: 27 },
                        ],
                    },
                    {
                        phraseText: "Uma mulher",
                        notePositions: [
                            { noteIndex: 0, charIndex: 12 },
                            { noteIndex: 1, charIndex: 15 },
                            { noteIndex: 2, charIndex: 19 },
                            { noteIndex: 3, charIndex: 22 },
                            { noteIndex: 4, charIndex: 25 },
                            { noteIndex: 5, charIndex: 28 },
                        ],
                    },
                    {
                        phraseText: "Uma mulher vestida de sol",
                        notePositions: [
                            { noteIndex: 0, charIndex: 40 },
                            { noteIndex: 1, charIndex: 43 },
                            { noteIndex: 2, charIndex: 46 },
                            { noteIndex: 3, charIndex: 50 },
                            { noteIndex: 4, charIndex: 53 },
                            { noteIndex: 5, charIndex: 56 },
                            { noteIndex: 6, charIndex: 60 },
                            { noteIndex: 7, charIndex: 63 },
                            { noteIndex: 8, charIndex: 66 },
                            { noteIndex: 9, charIndex: 70 },
                        ],
                    },
                    {
                        phraseText: "E uma coroa de doze estrelas",
                        notePositions: [
                            { noteIndex: 0, charIndex: 36 },
                            { noteIndex: 1, charIndex: 39 },
                            { noteIndex: 2, charIndex: 43 },
                            { noteIndex: 3, charIndex: 46 },
                            { noteIndex: 4, charIndex: 49 },
                            { noteIndex: 5, charIndex: 52 },
                        ],
                    },
                    {
                        phraseText: "Está gravida e grita",
                        notePositions: [
                            { noteIndex: 0, charIndex: 32 },
                            { noteIndex: 1, charIndex: 35 },
                            { noteIndex: 2, charIndex: 38 },
                            { noteIndex: 3, charIndex: 42 },
                            { noteIndex: 4, charIndex: 45 },
                            { noteIndex: 5, charIndex: 48 },
                            { noteIndex: 6, charIndex: 52 },
                        ],
                    },
                    {
                        phraseText: "Colocou-se diante da mulher",
                        notePositions: [
                            { noteIndex: 0, charIndex: 28 },
                            { noteIndex: 1, charIndex: 31 },
                            { noteIndex: 2, charIndex: 35 },
                            { noteIndex: 3, charIndex: 38 },
                            { noteIndex: 4, charIndex: 41 },
                            { noteIndex: 5, charIndex: 45 },
                            { noteIndex: 6, charIndex: 49 },
                            { noteIndex: 7, charIndex: 53 },
                            { noteIndex: 8, charIndex: 57 },
                        ],
                    },
                    {
                        phraseText: "que estava para dar a luz",
                        notePositions: [
                            { noteIndex: 0, charIndex: 41 },
                            { noteIndex: 1, charIndex: 45 },
                            { noteIndex: 2, charIndex: 48 },
                            { noteIndex: 3, charIndex: 51 },
                        ],
                    },
                    {
                        phraseText: "…tão logo nascesse",
                        notePositions: [
                            { noteIndex: 0, charIndex: 25 },
                            { noteIndex: 1, charIndex: 29 },
                            { noteIndex: 2, charIndex: 32 },
                            { noteIndex: 3, charIndex: 35 },
                        ],
                    },
                ],
            },
        ],
    ]);

    getLayout(musicTitle: string): ArrangementLayout | null {
        return this.layouts.get(musicTitle) ?? null;
    }
}
