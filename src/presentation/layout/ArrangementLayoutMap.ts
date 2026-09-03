import { NoteLayoutPosition } from "./NoteLayoutPosition";

export type PhraseLayout = {
    phraseText: string;
    notePositions: NoteLayoutPosition[];
};

export type ArrangementLayout = {
    musicTitle: string;
    phraseLayouts: PhraseLayout[];
};
