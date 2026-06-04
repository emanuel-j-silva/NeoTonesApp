import { MusicRepository } from "./MusicRepository";

export class DeleteMusicUseCase {

    constructor(
        private readonly repository: MusicRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}