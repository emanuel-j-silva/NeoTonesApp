import { SQLiteMusicRepository } from "../data/repositories/SQLiteMusicRepository";
import { CreateMusicUseCase } from "../domain/music/usecases/CreateMusicUseCase";
import { ListMusicsUseCase } from "../domain/music/usecases/ListMusicsUseCase";
import { ShowArrangementUseCase } from "../domain/music/usecases/ShowArrangementUseCase";

const musicRepository = new SQLiteMusicRepository();

export const dependencies = {
    musicRepository,
    createMusicUseCase: new CreateMusicUseCase(musicRepository),
    listMusicsUseCase: new ListMusicsUseCase(musicRepository),
    ShowArrangementUseCase: new ShowArrangementUseCase(musicRepository)
};
