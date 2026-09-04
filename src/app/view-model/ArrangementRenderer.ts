import * as Crypto from "expo-crypto";

import { Arrangement } from "../../domain/music/entities/Arrangement";
import { Melody } from "../../domain/music/entities/components/Melody";
import { MusicalPhrase } from "../../domain/music/entities/components/MusicalPhrase";
import { MusicComponent } from "../../domain/music/entities/components/MusicComponent";
import { Phrase } from "../../domain/music/entities/components/Phrase";
import { Section } from "../../domain/music/entities/components/Section";
import { ArrangementLineViewModel } from "./ArrangementLineViewModel";
import { ArrangementLayout } from "../../presentation/layout/ArrangementLayoutMap";

export class ArrangementRenderer {

    static render(
        arrangement: Arrangement,
        layout?: ArrangementLayout | null
    ): ArrangementLineViewModel[] {

        const components = arrangement.components;

        if (!layout || layout.phraseLayouts.length === 0) {
            return components.flatMap(
                component => this.renderComponent(component)
            );
        }

        return this.renderWithLayout(components, layout);
    }

    private static renderWithLayout(
        components: readonly MusicComponent[],
        layout: ArrangementLayout
    ): ArrangementLineViewModel[] {

        const lines: ArrangementLineViewModel[] = [];
        const consumedIndexes = new Set<number>();

        for (let i = 0; i < components.length; i++) {
            if (consumedIndexes.has(i)) {
                continue;
            }

            const component = components[i];

            if (component instanceof Section) {
                lines.push({
                    id: Crypto.randomUUID(),
                    type: "section",
                    text: component.title,
                });
                continue;
            }

            if (component instanceof Phrase) {
                const phraseLayout = layout.phraseLayouts.find(
                    pl => pl.phraseText === component.phrase
                );

                if (phraseLayout) {
                    const nextMelodyMatch = this.findNextMelodyWithIndex(components, i);

                    if (nextMelodyMatch) {
                        const { melody: nextMelody, index: melodyIndex } = nextMelodyMatch;

                        const resolvedPositions = phraseLayout.notePositions.map(
                            pos => ({
                                noteSymbol: nextMelody.notes[pos.noteIndex]?.getSymbol() ?? "?",
                                charIndex: pos.charIndex,
                            })
                        );

                        lines.push({
                            id: Crypto.randomUUID(),
                            type: "annotated-phrase",
                            text: component.phrase,
                            notePositions: resolvedPositions,
                        });

                        // Marca a melodia como consumida pela frase para evitar duplicação abaixo da letra
                        consumedIndexes.add(melodyIndex);
                        continue;
                    }
                }

                lines.push({
                    id: Crypto.randomUUID(),
                    type: "phrase",
                    text: component.phrase,
                });
                continue;
            }

            if (component instanceof Melody) {
                const noteSymbols = component.notes.map(note => note.getSymbol());
                lines.push({
                    id: Crypto.randomUUID(),
                    type: "melody",
                    text: noteSymbols.join(" "),
                    notes: noteSymbols,
                    annotation: component.annotation,
                });
                continue;
            }

            if (component instanceof MusicalPhrase) {
                lines.push(
                    ...component.components.flatMap(
                        child => this.renderComponent(child)
                    )
                );
            }
        }

        return lines;
    }

    private static findNextMelodyWithIndex(
        components: readonly MusicComponent[],
        currentIndex: number
    ): { melody: Melody; index: number } | null {

        for (let j = currentIndex + 1; j < components.length; j++) {
            if (components[j] instanceof Melody) {
                return { melody: components[j] as Melody, index: j };
            }
            if (components[j] instanceof Section || components[j] instanceof Phrase) {
                break;
            }
        }
        return null;
    }

    private static renderComponent(component: MusicComponent): ArrangementLineViewModel[] {
        if (component instanceof Section) {
            return [{
                id: Crypto.randomUUID(),
                type: "section",
                text: component.title
            }];
        }

        if (component instanceof Phrase) {
            return [{
                id: Crypto.randomUUID(),
                type: "phrase",
                text: component.phrase
            }];
        }

        if (component instanceof Melody) {
            const noteSymbols = component.notes.map(note => note.getSymbol());
            return [{
                id: Crypto.randomUUID(),
                type: "melody",
                text: noteSymbols.join(" "),
                notes: noteSymbols,
                annotation: component.annotation,
            }];
        }

        if (component instanceof MusicalPhrase) {
            return component.components.flatMap(
                child =>
                    this.renderComponent(child)
            );
        }

        return [];
    }
}