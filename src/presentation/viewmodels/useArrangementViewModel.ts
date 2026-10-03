import { useEffect, useState } from "react";
import { dependencies } from "../../app/dependencies";
import { ShowArrangementResult } from "../../domain/music/usecases/dtos/ShowArrangementResult";
import { Note } from "../../domain/music/entities/note/Note";
import { ArrangementBlock, BlockType } from "../../domain/music/entities/ArrangementBlock";
import { Arrangement } from "../../domain/music/entities/Arrangement";
import { Music } from "../../domain/music/entities/Music";
import * as Crypto from "expo-crypto";

export function useArrangementViewModel(musicId: string) {
  const [result, setResult] = useState<ShowArrangementResult>();
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [blocks, setBlocks] = useState<ArrangementBlock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
      setBlocks([...arrangement.arrangement.getBlocks()]);
    } finally {
      setIsLoading(false);
    }
  }

  async function changeTone(note: Note) {
    if (!result) return;
    const scaleType = result.arrangement.getTone().getScaleType();
    const arrangement =
      await dependencies.ShowArrangementUseCase.showArrangementInTone(
        result.musicId,
        note,
        scaleType
      );

    setSelectedNote(note);
    setResult(arrangement);
    setBlocks([...arrangement.arrangement.getBlocks()]);
    await saveArrangement([...arrangement.arrangement.getBlocks()], arrangement.arrangement.getTone());
  }

  function updateBlockContent(id: string, content: string) {
    setBlocks(prev => prev.map(b => b.id === id ? new ArrangementBlock(b.id, b.type, content) : b));
  }

  function updateBlockType(id: string, type: BlockType) {
    setBlocks(prev => prev.map(b => b.id === id ? new ArrangementBlock(b.id, type, b.content) : b));
  }

  function addBlock(type: BlockType = "lyrics") {
    const newBlock = new ArrangementBlock(Crypto.randomUUID(), type, "");
    setBlocks(prev => [...prev, newBlock]);
  }

  function removeBlock(id: string) {
    setBlocks(prev => prev.filter(b => b.id !== id));
  }

  async function saveChanges() {
    if (!result || !selectedNote) return;
    setIsSaving(true);
    try {
      await saveArrangement(blocks, result.arrangement.getTone());
    } finally {
      setIsSaving(false);
    }
  }

  async function saveArrangement(currentBlocks: ArrangementBlock[], tone: any) {
    const music = await dependencies.musicRepository.findById(musicId);
    if (!music) return;
    const updatedArrangement = new Arrangement(tone, [], currentBlocks);
    const updatedMusic = new Music(music.getId(), music.getTitle(), updatedArrangement);
    await dependencies.musicRepository.save(updatedMusic);
  }

  return {
    result,
    selectedNote,
    blocks,
    isLoading,
    isSaving,
    changeTone,
    updateBlockContent,
    updateBlockType,
    addBlock,
    removeBlock,
    saveChanges,
  };
}
