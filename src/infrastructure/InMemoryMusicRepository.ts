import * as Crypto from "expo-crypto"

import { Arrangement } from "../domain/music/entities/Arrangement";
import { Music } from "../domain/music/entities/Music";
import { Note } from "../domain/music/entities/note/Note";
import { ScaleType } from "../domain/music/entities/note/ScaleType";
import { Tone } from "../domain/music/entities/note/Tone";
import { MusicRepository } from "../domain/music/usecases/MusicRepository";

export class InMemoryMusicRepository implements MusicRepository {
    private musics: Music[] = [
        new Music(
            Crypto.randomUUID(),
            "Salmo 23",
            new Arrangement(
                new Tone(
                    Note.A,
                    ScaleType.MINOR
                )
            )
        ),

        new Music(
            Crypto.randomUUID(),
            "Magnificat",
            new Arrangement(
                new Tone(
                    Note.E,
                    ScaleType.MAJOR
                )
            )
        )
    ];

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