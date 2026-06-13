import * as Crypto from "expo-crypto"

import { Arrangement } from "../../domain/music/entities/Arrangement";
import { Melody } from "../../domain/music/entities/components/Melody";
import { MusicalPhrase } from "../../domain/music/entities/components/MusicalPhrase";
import { MusicComponent } from "../../domain/music/entities/components/MusicComponent";
import { Phrase } from "../../domain/music/entities/components/Phrase";
import { ArrangementLineViewModel } from "./ArrangementLineViewModel";

export class ArrangementRenderer {

    static render(arrangement: Arrangement): ArrangementLineViewModel[] {

        return arrangement.components.flatMap(
            component => this.renderComponent(component)
        );
    }

    private static renderComponent(component: MusicComponent): ArrangementLineViewModel[] {
        if (component instanceof Phrase) {
            return [{
                id: Crypto.randomUUID(),
                type: "phrase",
                text: component.phrase
            }];
        }

        if (component instanceof Melody) {
            return [{
                id: Crypto.randomUUID(),
                type: "melody",
                text: component.notes
                    .map(note =>
                        note.getSymbol()
                    )
                    .join(" ")
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