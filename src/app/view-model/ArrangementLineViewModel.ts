import { NotePosition } from "../../presentation/models/NotePosition";

export type ArrangementLineViewModel = {
    id: string;
    text: string;
    type: "phrase" | "section" | "melody" | "annotated-phrase";
    notes?: string[];
    annotation?: string;
    notePositions?: NotePosition[];
};
