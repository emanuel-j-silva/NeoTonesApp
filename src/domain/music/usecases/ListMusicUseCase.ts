import { Music } from "../Music";
import { MusicRepository } from "./MusicRepository";

export class ListMusicsUseCase {

    constructor(
        private readonly repository: MusicRepository
    ) {}

    async findAll(): Promise<Music[]> {
        return this.repository.findAll();
    }

    async findById(id: string): Promise<Music> {
        const music = await this.repository.findById(id);

        if (!music) {
            throw new Error("Music not found");
        }
        
        return music;
    }

    
}