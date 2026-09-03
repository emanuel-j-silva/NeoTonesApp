import * as Crypto from "expo-crypto";

import { Arrangement } from "../../domain/music/entities/Arrangement";
import { Melody } from "../../domain/music/entities/components/Melody";
import { MusicalPhrase } from "../../domain/music/entities/components/MusicalPhrase";
import { MusicComponent } from "../../domain/music/entities/components/MusicComponent";
import { Phrase } from "../../domain/music/entities/components/Phrase";
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

        for (let i = 0; i < components.length; i++) {
            const component = components[i];

            if (component instanceof Phrase) {
                const phraseLayout = layout.phraseLayouts.find(
                    pl => pl.phraseText === component.phrase
                );

                if (phraseLayout) {
                    const nextMelody = this.findNextMelody(components, i);

                    if (nextMelody) {
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
                        continue;
                    }
                }

                const isSectionHeader = component.phrase === component.phrase.toUpperCase() && component.phrase.length < 25;

                lines.push({
                    id: Crypto.randomUUID(),
                    type: isSectionHeader ? "section" : "phrase",
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

    private static findNextMelody(
        components: readonly MusicComponent[],
        currentIndex: number
    ): Melody | null {

        for (let j = currentIndex + 1; j < components.length; j++) {
            if (components[j] instanceof Melody) {
                return components[j] as Melody;
            }
        }
        return null;
    }

    private static renderComponent(component: MusicComponent): ArrangementLineViewModel[] {
        if (component instanceof Phrase) {
            const isSectionHeader = component.phrase === component.phrase.toUpperCase() && component.phrase.length < 25;
            return [{
                id: Crypto.randomUUID(),
                type: isSectionHeader ? "section" : "phrase",
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