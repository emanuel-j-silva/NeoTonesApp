import { useEffect, useMemo, useState } from "react";
import { Music } from "../../domain/music/entities/Music";
import { dependencies } from "../../app/dependencies";
import { Tone } from "../../domain/music/entities/note/Tone";
import { Note } from "../../domain/music/entities/note/Note";
import { ScaleType } from "../../domain/music/entities/note/ScaleType";

export function useLibraryViewModel() {
  const [musics, setMusics] = useState<Music[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMusics();
  }, []);

  async function loadMusics() {
    setIsLoading(true);
    try {
      const result = await dependencies.listMusicsUseCase.findAll();
      setMusics(result);
    } finally {
      setIsLoading(false);
    }
  }

  async function createNewMusic(title: string): Promise<string> {
    setIsLoading(true);
    try {
      const command = {
        title: title.trim() || "Nova Música",
        tone: new Tone(Note.C, ScaleType.MAJOR),
        components: [],
      };
      const newMusic = await dependencies.createMusicUseCase.execute(command);
      await loadMusics();
      return newMusic.getId();
    } finally {
      setIsLoading(false);
    }
  }

  const filteredMusics = useMemo(() => {
    if (!search.trim()) {
      return musics;
    }

    return musics.filter((music) =>
      music.getTitle().toLowerCase().includes(search.toLowerCase())
    );
  }, [musics, search]);

  return {
    musics: filteredMusics,
    search,
    setSearch,
    isLoading,
    createNewMusic,
    refresh: loadMusics,
  };
}
