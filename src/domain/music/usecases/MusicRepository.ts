import { Music } from "../entities/Music";

export interface MusicRepository{
    save(music: Music): Promise<void>;

    findById(id: string): Promise<Music | null>;

    existsByTitle(title: string): Promise<boolean>;

    findAll(): Promise<Music[]>;

    delete(id: string): Promise<void>;
}