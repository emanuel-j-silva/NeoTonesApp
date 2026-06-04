import { MusicComponent } from "../../entities/components/MusicComponent";
import { Tone } from "../../entities/note/Tone";

export type CreateMusicCommand = {
    title: string;
    tone: Tone;
    components: readonly MusicComponent[];
};