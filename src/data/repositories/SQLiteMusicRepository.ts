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
