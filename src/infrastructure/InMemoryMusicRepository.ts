import * as Crypto from "expo-crypto"

import { Arrangement } from "../domain/music/entities/Arrangement";
import { Music } from "../domain/music/entities/Music";
import { Note } from "../domain/music/entities/note/Note";
import { ScaleType } from "../domain/music/entities/note/ScaleType";
import { Tone } from "../domain/music/entities/note/Tone";
import { MusicRepository } from "../domain/music/usecases/MusicRepository";
import { Phrase } from "../domain/music/entities/components/Phrase";
import { Melody } from "../domain/music/entities/components/Melody";

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
        ),

        new Music(
            Crypto.randomUUID(),
            "Um Grande Sinal",
            new Arrangement(
                new Tone(
                    Note.A,
                    ScaleType.MINOR
                ),
                [
                    new Phrase("INTRO"),
                    new Melody([
                        Note.F_SHARP,
                        Note.B,
                        Note.A_SHARP,
                        Note.A,
                        Note.G_SHARP,
                        Note.G,
                        Note.F_SHARP
                    ]),

                    new Melody([
                        Note.F_SHARP,
                        Note.B,
                        Note.A_SHARP,
                        Note.A,
                        Note.G_SHARP,
                        Note.G,
                        Note.F_SHARP
                    ]),

            new Phrase("CLARINETE"),

            new Melody([
                Note.F_SHARP,
                Note.B,
                Note.D,
                Note.B,
                Note.A_SHARP,
                Note.B
            ]),

            new Phrase("UM GRANDE SINAL"),

            new Melody([
                Note.B,
                Note.C_SHARP,
                Note.D
            ])
        ]
    )
)
    ];

    async save(music: Music): Promise<void> {

        this.musics.push(music);
    }

    async findById(id: string): Promise<Music | null> {

        return (
            this.musics.find(music => music.getId() === id) ?? null
        );
    }

    async existsByTitle(title: string): Promise<boolean> {

        return this.musics.some(music =>
            music.getTitle().trim().toLowerCase() === title.trim().toLowerCase()
        );
    }

    async findAll(): Promise<Music[]> {
        return [...this.musics];
    }

    async delete(id: string): Promise<void> {
        this.musics = this.musics.filter(music => music.getId() !== id);
    }
}