import { useEffect, useMemo, useState } from "react";
import { FlatList, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";

import { dependencies } from "../../../app/dependencies";

import { ShowArrangementResult } from "../../../domain/music/usecases/dtos/ShowArrangementResult";
import { Note } from "../../../domain/music/entities/note/Note";

import { ArrangementRenderer } from "../../../app/view-model/ArrangementRenderer";
import { ArrangementLineViewModel } from "../../../app/view-model/ArrangementLineViewModel";
import { NotePosition } from "../../models/NotePosition";

import { InMemoryLayoutProvider } from "../../layout/InMemoryLayoutProvider";
import { TonePickerModal } from "../../components/TonePickerModal/TonePickerModal";

import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";

type ArrangementRouteProp =
  RouteProp<RootStackParamList, "Arrangement">;

type Props = {
  route: ArrangementRouteProp;
  navigation: any;
};

const layoutProvider = new InMemoryLayoutProvider();

function buildAnnotationLine(notePositions: NotePosition[]): string {
  const sorted = [...notePositions].sort(
    (a, b) => a.charIndex - b.charIndex
  );

  let line = "";

  for (const pos of sorted) {
    while (line.length < pos.charIndex) {
      line += " ";
    }
    line += pos.noteSymbol;
  }

  return line;
}

export function ArrangementScreen({
  route,
  navigation,
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

    const layout = layoutProvider.getLayout(result.title);

    return ArrangementRenderer.render(
      result.arrangement,
      layout
    );
  }, [result]);

  if (!result || !selectedNote) {
    return null;
  }

  function renderLine(item: ArrangementLineViewModel) {
    if (item.type === "section") {
      return (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionMarkerRow}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionMarkerText}>
                {item.text}
              </Text>
            </View>
            <View style={styles.sectionDividerLine} />
          </View>
        </View>
      );
    }

    if (item.type === "annotated-phrase" && item.notePositions) {
      const annotationText = buildAnnotationLine(item.notePositions);

      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.annotatedPhraseScroll}
        >
          <View style={styles.annotatedPhraseContainer}>
            <Text style={styles.noteAnnotationLine}>
              {annotationText}
            </Text>
            <Text style={styles.annotatedPhraseText}>
              {item.text}
            </Text>
          </View>
        </ScrollView>
      );
    }

    if (item.type === "melody") {
      const notesList = item.notes || item.text.split(" ");
      return (
        <View style={styles.melodyRow}>
          <View style={styles.melodyContainer}>
            {notesList.map((noteSymbol, idx) => (
              <View key={idx} style={styles.melodyNote}>
                <Text style={styles.melodyNoteText}>{noteSymbol}</Text>
              </View>
            ))}
          </View>
          {item.annotation ? (
            <View style={styles.annotationBadge}>
              <Text style={styles.annotationBadgeText}>
                {item.annotation}
              </Text>
            </View>
          ) : null}
        </View>
      );
    }

    return (
      <Text style={styles.phrase}>
        {item.text}
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {result.title}
        </Text>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
        <TonePickerModal
          currentNote={selectedNote}
          onSelect={changeTone}
          theme={theme}
        />
      </View>

      <FlatList
        data={lines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => renderLine(item)}
      />
    </SafeAreaView>
  );
}