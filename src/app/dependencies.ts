import { InMemoryMusicRepository } from "../infrastructure/InMemoryMusicRepository";
import { CreateMusicUseCase } from "../domain/music/usecases/CreateMusicUseCase";
import { ListMusicsUseCase } from "../domain/music/usecases/ListMusicsUseCase";

const musicRepository = new InMemoryMusicRepository();

export const dependencies = {
    musicRepository,
    createMusicUseCase: new CreateMusicUseCase(musicRepository),
    listMusicsUseCase: new ListMusicsUseCase(musicRepository)
};