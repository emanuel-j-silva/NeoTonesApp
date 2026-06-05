import * as Crypto from "expo-crypto"

import { Arrangement } from "../entities/Arrangement";
import { Music } from "../entities/Music";
import { CreateMusicCommand } from "./dtos/CreateMusicCommand";
import { MusicRepository } from "./MusicRepository";

export class CreateMusicUseCase {

    constructor(
        private readonly musicRepository: MusicRepository
    ) {}

    async execute(command: CreateMusicCommand): Promise<Music> {
        const alreadyExists = await this.musicRepository.existsByTitle(command.title);

        if (alreadyExists) {
            throw new Error("A music with this title already exists");
        }

        const id = Crypto.randomUUID()
        const arrangement = new Arrangement(command.tone, command.components)
        const music = new Music(id, command.title, arrangement);

        await this.musicRepository.save(music);
        return music;
    }
}