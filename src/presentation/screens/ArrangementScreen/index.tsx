import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";

import { ArrangementLineViewModel } from "../../../app/view-model/ArrangementLineViewModel";
import { NotePosition } from "../../models/NotePosition";
import { TonePickerModal } from "../../components/TonePickerModal/TonePickerModal";
import { useArrangementViewModel } from "../../viewmodels/useArrangementViewModel";

import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";

type ArrangementRouteProp =
  RouteProp<RootStackParamList, "Arrangement">;

type Props = {
  route: ArrangementRouteProp;
  navigation: any;
};

function buildAnnotationLine(notePositions: NotePosition[]): string {
  const sorted = [...notePositions].sort(
    (a, b) => a.charIndex - b.charIndex
  );

  let line = "";

  for (const pos of sorted) {
    if (line.length < pos.charIndex) {
      while (line.length < pos.charIndex) {
        line += " ";
      }
    } else if (line.length > 0) {
      line += " ";
    }
    line += pos.noteSymbol;
  }

  return line;
}

export function ArrangementScreen({
  route,
}: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const {
    result,
    selectedNote,
    lines,
    changeTone,
  } = useArrangementViewModel(route.params.musicId);

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
        <View style={styles.annotatedPhraseContainer}>
          <Text style={styles.noteAnnotationLine}>
            {annotationText}
          </Text>
          <Text style={styles.annotatedPhraseText}>
            {item.text}
          </Text>
        </View>
      );
    }

    if (item.type === "melody") {
      return (
        <View style={styles.melodyRow}>
          <Text style={styles.melodyText}>{item.text}</Text>
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
