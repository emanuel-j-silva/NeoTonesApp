import { Music } from "../domain/music/Music";
import { MusicRepository } from "../domain/music/usecases/MusicRepository";

export class InMemoryMusicRepository implements MusicRepository {
    private musics: Music[] = [];

    async save(music: Music): Promise<void> {

        this.musics.push(music);
    }

    async findById(id: string): Promise<Music | null> {

        return (
            this.musics.find(music => music.id === id) ?? null
        );
    }

    async existsByTitle(title: string): Promise<boolean> {

        return this.musics.some(music =>
            music.title.trim().toLowerCase() === title.trim().toLowerCase()
        );
    }

    async findAll(): Promise<Music[]> {
        return [...this.musics];
    }

    async delete(id: string): Promise<void> {
        this.musics = this.musics.filter(music => music.id !== id);
    }
}