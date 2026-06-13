import { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";

import { dependencies } from "../../../app/dependencies";

import { ShowArrangementResult } from "../../../domain/music/usecases/dtos/ShowArrangementResult";
import { Note } from "../../../domain/music/entities/note/Note";

import { ArrangementRenderer } from "../../../app/view-model/ArrangementRenderer";

import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";

type ArrangementRouteProp =
  RouteProp< RootStackParamList, "Arrangement" >;

type Props = {
  route: ArrangementRouteProp;
};

export function ArrangementScreen({
  route,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [result, setResult] = useState<ShowArrangementResult>();
  const [selectedNote, setSelectedNote] = useState<Note>();

  useEffect(() => {
    loadOriginalArrangement();
  }, []);

  async function loadOriginalArrangement() {
    const arrangement =
      await dependencies
        .ShowArrangementUseCase
        .showOriginalArrangement(
          route.params.musicId
        );

    setResult(arrangement);

    setSelectedNote(arrangement.arrangement.getTone().getNote());
  }

  async function changeTone(note: Note) {
    if (!result) {
      return;
    }

    const arrangement =
      await dependencies
        .ShowArrangementUseCase
        .showArrangementInTone(
          result.musicId,
          note,
          result.arrangement
            .getTone()
            .getScaleType()
        );

    setSelectedNote(note);
    setResult(arrangement);
  }

  const lines = useMemo(() => {
    if (!result) {
      return [];
    }

    return ArrangementRenderer.render(
      result.arrangement
    );
  }, [result]);

  if (!result) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {result.title}
      </Text>

      <Text style={styles.subtitle}>
        Tom:{" "}
        {
          result.arrangement
            .getTone()
            .getNote()
            .getSymbol()
        }
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.toneSelector
        }
      >
        {Note.VALUES.map((note) => (
          <Pressable
            key={note.getLetter()}
            style={[
              styles.toneChip,
              selectedNote?.equalsNote(note) &&
                styles.selectedToneChip,
            ]}
            onPress={() =>
              changeTone(note)
            }
          >
            <Text
              style={[
                styles.toneChipText,
                selectedNote?.equalsNote(
                  note
                ) &&
                  styles.selectedToneChipText,
              ]}
            >
              {note.getSymbol()}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <FlatList
        data={lines}
        keyExtractor={(item) =>
          item.id
        }
        contentContainerStyle={
          styles.content
        }
        renderItem={({ item }) => (
          <Text
            style={
              item.type === "melody"
                ? styles.melody
                : styles.phrase
            }
          >
            {item.text}
          </Text>
        )}
      />
    </SafeAreaView>
  );
}