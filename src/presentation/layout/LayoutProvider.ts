import { ArrangementLayout } from "./ArrangementLayoutMap";

export interface LayoutProvider {
    getLayout(musicTitle: string): ArrangementLayout | null;
}
