import { useEffect, useMemo, useState } from "react";
import { dependencies } from "../../app/dependencies";
import { ShowArrangementResult } from "../../domain/music/usecases/dtos/ShowArrangementResult";
import { Note } from "../../domain/music/entities/note/Note";
import { ArrangementRenderer } from "../../app/view-model/ArrangementRenderer";
import { InMemoryLayoutProvider } from "../layout/InMemoryLayoutProvider";

const layoutProvider = new InMemoryLayoutProvider();

export function useArrangementViewModel(musicId: string) {
  const [result, setResult] = useState<ShowArrangementResult>();
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadOriginalArrangement();
  }, [musicId]);

  async function loadOriginalArrangement() {
    setIsLoading(true);
    try {
      const arrangement =
        await dependencies.ShowArrangementUseCase.showOriginalArrangement(musicId);
      setResult(arrangement);
      setSelectedNote(arrangement.arrangement.getTone().getNote());
    } finally {
      setIsLoading(false);
    }
  }

  async function changeTone(note: Note) {
    if (!result) {
      return;
    }

    const arrangement =
      await dependencies.ShowArrangementUseCase.showArrangementInTone(
        result.musicId,
        note,
        result.arrangement.getTone().getScaleType()
      );

    setSelectedNote(note);
    setResult(arrangement);
  }

  const lines = useMemo(() => {
    if (!result) {
      return [];
    }

    const layout = layoutProvider.getLayout(result.title);
    return ArrangementRenderer.render(result.arrangement, layout);
  }, [result]);

  return {
    result,
    selectedNote,
    lines,
    isLoading,
    changeTone,
    reload: loadOriginalArrangement,
  };
}
