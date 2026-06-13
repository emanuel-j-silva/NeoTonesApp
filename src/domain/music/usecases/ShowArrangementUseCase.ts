import { Note } from "../entities/note/Note";
import { ScaleType } from "../entities/note/ScaleType";
import { Tone } from "../entities/note/Tone";
import { ShowArrangementResult } from "./dtos/ShowArrangementResult";
import { MusicRepository } from "./MusicRepository";

export class ShowArrangementUseCase{
    constructor (
        private readonly repository: MusicRepository
    ){}

    async showOriginalArrangement(id: string): Promise<ShowArrangementResult> {
        const music = await this.repository.findById(id);
        if (!music) {
            throw new Error("Music not found");
        }

        return {
            musicId: music.getId(),
            title: music.getTitle(),
            arrangement: music.getArrangement()
        };
    }

    async showArrangementInTone(id: string, note: Note, scaleType: ScaleType): Promise<ShowArrangementResult>{
        const music =  await this.repository.findById(id);
        if (!music) {
            throw new Error("Music not found");
        }

        const tone = new Tone(note, scaleType);
        const arrangement = music.getArrangement().transposeTo(tone)

        return {
            musicId: music.getId(), 
            title: music.getTitle(),
            arrangement: arrangement
        };
    }
}