import { ArrangementLineViewModel } from "./ArrangementLineViewModel";

export type ArrangementScreenState = {
    title: string;
    originalTone: string;
    currentTone: string;
    lines: ArrangementLineViewModel[];
};