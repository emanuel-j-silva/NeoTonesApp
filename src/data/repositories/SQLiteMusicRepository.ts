import * as SQLite from "expo-sqlite";
import { Music } from "../../domain/music/entities/Music";
import { Arrangement } from "../../domain/music/entities/Arrangement";
import { Note } from "../../domain/music/entities/note/Note";
import { ScaleType } from "../../domain/music/entities/note/ScaleType";
import { Tone } from "../../domain/music/entities/note/Tone";
import { MusicRepository } from "../../domain/music/usecases/MusicRepository";

export class SQLiteMusicRepository implements MusicRepository {
    private dbPromise: Promise<SQLite.SQLiteDatabase>;

    constructor() {
        this.dbPromise = SQLite.openDatabaseAsync("neotones.db");
        this.init();
    }

    private async init() {
        const db = await this.dbPromise;
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS musics (
                id TEXT PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                tone_note TEXT NOT NULL,
                tone_scale TEXT NOT NULL,
                text_content TEXT NOT NULL
            );
        `);

        const all = await this.findAll();
        if (all.length === 0) {
            await this.seedInitialData();
        }
    }

    private async seedInitialData() {
        const initialMusics = [
            new Music(
                "salmo-23",
                "Salmo 23",
                new Arrangement(
                    new Tone(Note.A, ScaleType.MINOR),
                    [],
                    "[INTRO]\n[La] [Re] [Mi7] [La]\n\n[VERSO 1]\nO [La] Senhor é o pastor [Re] que me conduz,\nNão [Sol] me falta [Do] coisa alguma.\n[Fa] Em prados e [Re] verdes matas\n[Mi7] Ele me faz repousar."
                )
            ),
            new Music(
                "magnificat",
                "Magnificat",
                new Arrangement(
                    new Tone(Note.E, ScaleType.MAJOR),
                    [],
                    "[INTRO]\n[Mi] [La] [Si7] [Mi]\n\n[REFRÃO]\nA minha [Mi] alma engrandece ao [La] Senhor,\nE o meu [Si7] espírito exulta em Deus, meu [Mi] Salvador."
                )
            ),
            new Music(
                "um-grande-sinal",
                "Um Grande Sinal",
                new Arrangement(
                    new Tone(Note.A, ScaleType.MINOR),
                    [],
                    "[INTRO]\n[Fa#] [Si] [La#] [La] [Sol#] [Sol] [Fa#] (X2)\n[Fa#] [Sol] [Fa#] [Fa] [Fa] [Fa#]\n[Fa#] [Si] [Re] [Si] [La#] [Si]\n\n[REFRÃO]\nUm [Si] Grande [Do#] sinal…\nUma [La] mulher [Do#] [Mi] [La] [Mi] [Do#]\nUma [Si] mulher [Re] vestida [Do#] de [Si] sol\nTendo [Si] a lua [Re] sob [Do#] os [Si] pés\nE uma coroa de doze estrelas\nEstá [Si] gravida [Re] e [Do#] grita [Si]\nCom tormentos, para dar a luz"
                )
            )
        ];
        for (const m of initialMusics) {
            await this.save(m);
        }
    }

    async save(music: Music): Promise<void> {
        const db = await this.dbPromise;
        const tone = music.getArrangement().getTone();
        await db.runAsync(
            `INSERT OR REPLACE INTO musics (id, title, tone_note, tone_scale, text_content) VALUES (?, ?, ?, ?, ?)`,
            music.getId(),
            music.getTitle(),
            tone.getNote().getLetter(),
            tone.getScaleType(),
            music.getArrangement().getTextContent()
        );
    }

    async findById(id: string): Promise<Music | null> {
        const db = await this.dbPromise;
        const row: any = await db.getFirstAsync(
            `SELECT * FROM musics WHERE id = ?`,
            id
        );
        if (!row) return null;
        return this.rowToMusic(row);
    }

    async existsByTitle(title: string): Promise<boolean> {
        const db = await this.dbPromise;
        const row: any = await db.getFirstAsync(
            `SELECT COUNT(*) as count FROM musics WHERE LOWER(title) = LOWER(?)`,
            title.trim()
        );
        return row && row.count > 0;
    }

    async findAll(): Promise<Music[]> {
        const db = await this.dbPromise;
        const rows: any[] = await db.getAllAsync(`SELECT * FROM musics ORDER BY title ASC`);
        return rows.map(r => this.rowToMusic(r));
    }

    async delete(id: string): Promise<void> {
        const db = await this.dbPromise;
        await db.runAsync(`DELETE FROM musics WHERE id = ?`, id);
    }

    private rowToMusic(row: any): Music {
        const note = Note.VALUES.find(
            n => n.getLetter() === row.tone_note || n.getSymbol() === row.tone_note
        ) ?? Note.C;
        const scaleType = row.tone_scale as ScaleType;
        const tone = new Tone(note, scaleType);
        const arrangement = new Arrangement(tone, [], row.text_content);
        return new Music(row.id, row.title, arrangement);
    }
}
