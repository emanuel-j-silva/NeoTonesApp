import * as Crypto from "expo-crypto";

import { Arrangement } from "../../domain/music/entities/Arrangement";
import { ArrangementBlock } from "../../domain/music/entities/ArrangementBlock";
import { Music } from "../../domain/music/entities/Music";
import { Note } from "../../domain/music/entities/note/Note";
import { ScaleType } from "../../domain/music/entities/note/ScaleType";
import { Tone } from "../../domain/music/entities/note/Tone";
import { MusicRepository } from "../../domain/music/usecases/MusicRepository";

export class InMemoryMusicRepository implements MusicRepository {
    private musics: Music[] = [
        new Music(
            Crypto.randomUUID(),
            "Salmo 23",
            new Arrangement(
                new Tone(
                    Note.A,
                    ScaleType.MINOR
                ),
                [],
                [
                    new ArrangementBlock("1", "section", "INTRO"),
                    new ArrangementBlock("2", "notes", "Am Dm E7 Am"),
                    new ArrangementBlock("3", "section", "VERSO 1"),
                    new ArrangementBlock("4", "lyrics", "O Senhor é o pastor que me conduz,"),
                    new ArrangementBlock("5", "notes", "Am Dm"),
                    new ArrangementBlock("6", "lyrics", "Não me falta coisa alguma."),
                    new ArrangementBlock("7", "notes", "G7 C"),
                ]
            )
        ),

        new Music(
            Crypto.randomUUID(),
            "Magnificat",
            new Arrangement(
                new Tone(
                    Note.E,
                    ScaleType.MAJOR
                ),
                [],
                [
                    new ArrangementBlock("1", "section", "INTRO"),
                    new ArrangementBlock("2", "notes", "E A B7 E"),
                    new ArrangementBlock("3", "section", "REFRÃO"),
                    new ArrangementBlock("4", "lyrics", "A minha alma engrandece ao Senhor,"),
                    new ArrangementBlock("5", "notes", "E A"),
                ]
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
                [],
                [
                    new ArrangementBlock("1", "section", "INTRO"),
                    new ArrangementBlock("2", "notes", "F# B A# A G# G F#"),
                    new ArrangementBlock("3", "section", "REFRÃO"),
                    new ArrangementBlock("4", "lyrics", "Um Grande sinal…"),
                    new ArrangementBlock("5", "notes", "B C# D"),
                    new ArrangementBlock("6", "lyrics", "Uma mulher vestida de sol"),
                    new ArrangementBlock("7", "notes", "B D C# B D C# B"),
                ]
            )
        )
    ];

    async save(music: Music): Promise<void> {
        const index = this.musics.findIndex(m => m.getId() === music.getId());
        if (index >= 0) {
            this.musics[index] = music;
        } else {
            this.musics.push(music);
        }
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
