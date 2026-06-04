import { MusicComponent } from "../../components/MusicComponent";
import { Tone } from "../../note/Tone";

export type CreateMusicCommand = {
    title: string;
    tone: Tone;
    components: readonly MusicComponent[];
};