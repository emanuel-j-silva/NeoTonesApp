import * as Crypto from "expo-crypto";

import { Arrangement } from "../domain/music/entities/Arrangement";
import { Music } from "../domain/music/entities/Music";
import { Note } from "../domain/music/entities/note/Note";
import { ScaleType } from "../domain/music/entities/note/ScaleType";
import { Tone } from "../domain/music/entities/note/Tone";
import { MusicRepository } from "../domain/music/usecases/MusicRepository";
import { Phrase } from "../domain/music/entities/components/Phrase";
import { Melody } from "../domain/music/entities/components/Melody";
import { Section } from "../domain/music/entities/components/Section";

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
                    // INTRO
                    new Section("INTRO"),
                    new Melody([
                        Note.F_SHARP, Note.B, Note.A_SHARP, Note.A, Note.G_SHARP, Note.G, Note.F_SHARP
                    ], "(X2)"),
                    new Melody([
                        Note.F_SHARP, Note.G, Note.F_SHARP, Note.F, Note.F, Note.F_SHARP
                    ]),
                    new Melody([
                        Note.F_SHARP, Note.B, Note.D, Note.B, Note.A_SHARP, Note.B
                    ]),
                    new Melody([
                        Note.B, Note.A_SHARP, Note.A, Note.G_SHARP, Note.G, Note.F_SHARP
                    ], "(X2)"),
                    new Melody([
                        Note.F_SHARP, Note.B
                    ]),

                    // REFRÃO
                    new Section("REFRÃO"),
                    new Phrase("Um Grande sinal…"),
                    new Melody([
                        Note.B, Note.C_SHARP, Note.D
                    ]),

                    new Phrase("Uma mulher"),
                    new Melody([
                        Note.A, Note.C_SHARP, Note.E, Note.A, Note.E, Note.C_SHARP
                    ]),

                    new Phrase("Uma mulher vestida de sol"),
                    new Melody([
                        Note.B, Note.D, Note.C_SHARP, Note.B, Note.D, Note.C_SHARP, Note.B, Note.D, Note.C_SHARP, Note.B
                    ]),

                    new Phrase("Tendo a lua sob os pés"),

                    new Phrase("E uma coroa de doze estrelas"),
                    new Melody([
                        Note.A, Note.C_SHARP, Note.E, Note.A, Note.E, Note.C_SHARP
                    ]),

                    new Phrase("Está gravida e grita"),
                    new Melody([
                        Note.B, Note.D, Note.C_SHARP, Note.B, Note.D, Note.C_SHARP, Note.B
                    ]),

                    new Phrase("Com tormentos, para dar a luz"),

                    // PASSAGEM
                    new Section("PASSAGEM"),
                    new Melody([
                        Note.F_SHARP, Note.E, Note.D, Note.C_SHARP, Note.B
                    ]),

                    new Phrase("Colocou-se diante da mulher"),
                    new Melody([
                        Note.B, Note.C_SHARP, Note.D, Note.E, Note.F_SHARP, Note.G, Note.F_SHARP, Note.G, Note.F_SHARP
                    ]),

                    new Phrase("que estava para dar a luz"),
                    new Melody([
                        Note.F_SHARP, Note.A, Note.B, Note.A
                    ]),

                    new Phrase("…tão logo nascesse"),
                    new Melody([
                        Note.F_SHARP, Note.E, Note.D, Note.C_SHARP
                    ]),

                    new Phrase("…enfurecido por causa da mulher"),
                    new Melody([
                        Note.F_SHARP, Note.E, Note.D, Note.F_SHARP, Note.E, Note.D, Note.F_SHARP
                    ]),

                    // SOLO
                    new Section("SOLO"),
                    new Melody([
                        Note.F_SHARP, Note.F_SHARP, Note.F_SHARP, Note.E, Note.E, Note.D, Note.D
                    ]),
                    new Melody([
                        Note.F_SHARP, Note.F_SHARP, Note.F_SHARP, Note.E, Note.E, Note.D, Note.E
                    ]),
                    new Melody([
                        Note.E, Note.E, Note.E, Note.D, Note.D, Note.C_SHARP, Note.D
                    ]),
                    new Melody([
                        Note.G, Note.G, Note.G, Note.G, Note.A, Note.G, Note.F_SHARP
                    ]),

                    // ALTERNATIVO
                    new Section("ALTERNATIVO"),
                    new Melody([
                        Note.B, Note.D, Note.F_SHARP, Note.B, Note.F_SHARP, Note.D
                    ], "(ao final)"),
                    new Melody([
                        Note.A, Note.C_SHARP, Note.E, Note.A, Note.E, Note.C_SHARP
                    ], "(ao final)"),
                    new Melody([
                        Note.G, Note.B, Note.D, Note.G, Note.D, Note.B
                    ], "(ao final)"),
                    new Melody([
                        Note.G, Note.G, Note.G, Note.G, Note.A, Note.G, Note.F_SHARP
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