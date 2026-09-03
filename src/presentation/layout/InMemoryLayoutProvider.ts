import { ArrangementLayout } from "./ArrangementLayoutMap";
import { LayoutProvider } from "./LayoutProvider";

/**
 * Provider de layout em memória com dados mockados.
 *
 * Cada música pode ter um ArrangementLayout que define onde
 * as notas da melodia aparecem sobre o texto das frases.
 *
 * noteIndex → índice da nota na Melody que vem logo após a Phrase.
 * charIndex → posição do caractere na frase onde a nota será exibida.
 */
export class InMemoryLayoutProvider implements LayoutProvider {

    private readonly layouts = new Map<string, ArrangementLayout>([
        [
            "Um Grande Sinal",
            {
                musicTitle: "Um Grande Sinal",
                phraseLayouts: [
                    {
                        phraseText: "UM GRANDE SINAL",
                        notePositions: [
                            { noteIndex: 0, charIndex: 3 },
                            { noteIndex: 1, charIndex: 10 },
                            { noteIndex: 2, charIndex: 14 },
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
