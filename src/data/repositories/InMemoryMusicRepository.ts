import * as Crypto from "expo-crypto";

import { Arrangement } from "../../domain/music/entities/Arrangement";
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
                "[INTRO]\n[La] [Re] [Mi7] [La]\n\n[VERSO 1]\nO [La] Senhor é o pastor [Re] que me conduz,\nNão [Sol] me falta [Do] coisa alguma.\n[Fa] Em prados e [Re] verdes matas\n[Mi7] Ele me faz repousar."
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
                "[INTRO]\n[Mi] [La] [Si7] [Mi]\n\n[REFRÃO]\nA minha [Mi] alma engrandece ao [La] Senhor,\nE o meu [Si7] espírito exulta em Deus, meu [Mi] Salvador."
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
                "[INTRO]\n[Fa#] [Si] [La#] [La] [Sol#] [Sol] [Fa#] (X2)\n[Fa#] [Sol] [Fa#] [Fa] [Fa] [Fa#]\n[Fa#] [Si] [Re] [Si] [La#] [Si]\n\n[REFRÃO]\nUm [Si] Grande [Do#] sinal…\nUma [La] mulher [Do#] [Mi] [La] [Mi] [Do#]\nUma [Si] mulher [Re] vestida [Do#] de [Si] sol\nTendo [Si] a lua [Re] sob [Do#] os [Si] pés\nE uma coroa de doze estrelas\nEstá [Si] gravida [Re] e [Do#] grita [Si]\nCom tormentos, para dar a luz"
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
