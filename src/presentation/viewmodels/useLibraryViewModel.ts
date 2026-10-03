import { useEffect, useMemo, useState } from "react";
import { Music } from "../../domain/music/entities/Music";
import { dependencies } from "../../app/dependencies";

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
    refresh: loadMusics,
  };
}
