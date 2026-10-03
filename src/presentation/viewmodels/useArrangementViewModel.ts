import { useEffect, useState } from "react";
import { dependencies } from "../../app/dependencies";
import { ShowArrangementResult } from "../../domain/music/usecases/dtos/ShowArrangementResult";
import { Note } from "../../domain/music/entities/note/Note";
import { Arrangement } from "../../domain/music/entities/Arrangement";
import { Music } from "../../domain/music/entities/Music";
import { Tone } from "../../domain/music/entities/note/Tone";
import { ArrangementTextTransposer } from "../../domain/music/usecases/ArrangementTextTransposer";

export function useArrangementViewModel(musicId: string) {
  const [result, setResult] = useState<ShowArrangementResult>();
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [arrangementText, setArrangementText] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
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
      setArrangementText(arrangement.arrangement.getTextContent());
    } finally {
      setIsLoading(false);
    }
  }

  async function changeTone(note: Note) {
    if (!result || !selectedNote) return;
    const oldTone = result.arrangement.getTone();
    const newTone = new Tone(note, oldTone.getScaleType());

    // Transpose current arrangementText in state so unsaved edits are preserved and transposed correctly
    const transposedText = ArrangementTextTransposer.transpose(arrangementText, oldTone, newTone);
    
    const newArrangement = new Arrangement(newTone, [], transposedText);
    const updatedResult = {
      ...result,
      arrangement: newArrangement,
    };

    setSelectedNote(note);
    setResult(updatedResult);
    setArrangementText(transposedText);

    await saveArrangement(transposedText, newTone);
  }

  function handleEditText(text: string) {
    setArrangementText(text);
  }

  async function saveChanges() {
    if (!result || !selectedNote) return;
    setIsSaving(true);
    try {
      const currentTone = result.arrangement.getTone();
      await saveArrangement(arrangementText, currentTone);

      const updatedArrangement = new Arrangement(currentTone, [], arrangementText);
      setResult({
        ...result,
        arrangement: updatedArrangement,
      });

      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  async function saveArrangement(text: string, tone: Tone) {
    const music = await dependencies.musicRepository.findById(musicId);
    if (!music) return;
    const updatedArrangement = new Arrangement(tone, [], text);
    const updatedMusic = new Music(music.getId(), music.getTitle(), updatedArrangement);
    await dependencies.musicRepository.save(updatedMusic);
  }

  return {
    result,
    selectedNote,
    arrangementText,
    isEditing,
    setIsEditing,
    isLoading,
    isSaving,
    changeTone,
    handleEditText,
    saveChanges,
  };
}
