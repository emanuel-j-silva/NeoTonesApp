import { ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { TonePickerModal } from "../../components/TonePickerModal/TonePickerModal";
import { useArrangementViewModel } from "../../viewmodels/useArrangementViewModel";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";

type ArrangementRouteProp = RouteProp<RootStackParamList, "Arrangement">;
type Props = { route: ArrangementRouteProp; navigation: any };

export function ArrangementScreen({ route }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const {
    result,
    selectedNote,
    arrangementText,
    isEditing,
    setIsEditing,
    changeTone,
    handleEditText,
    saveChanges,
    isSaving,
  } = useArrangementViewModel(route.params.musicId);

  if (!result || !selectedNote) {
    return null;
  }

  function renderFormattedChordChart(text: string) {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();
      const isSection = trimmed.startsWith("[") && trimmed.endsWith("]") && !trimmed.includes(" ");

      if (isSection) {
        return (
          <View key={lineIdx} style={styles.sectionContainer}>
            <View style={styles.sectionMarkerRow}>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionMarkerText}>{trimmed.replace(/[\[\]]/g, "")}</Text>
              </View>
              <View style={styles.sectionDividerLine} />
            </View>
          </View>
        );
      }

      const parts = line.split(/(\[[^\]]+\]|\/[A-Za-zÇçÁáÉéÍíÓóÚúÃãÕõ#b]+[a-zA-Z0-9/]*)/g);

      return (
        <Text key={lineIdx} style={styles.chartLine}>
          {parts.map((part, partIdx) => {
            if (!part) return null;
            if (part.startsWith("[") && part.endsWith("]")) {
              const chord = part.slice(1, -1);
              return (
                <Text key={partIdx} style={styles.inlineChord}>
                  {chord}{" "}
                </Text>
              );
            }
            if (part.startsWith("/")) {
              const chord = part.slice(1);
              return (
                <Text key={partIdx} style={styles.inlineChord}>
                  {chord}{" "}
                </Text>
              );
            }
            return (
              <Text key={partIdx} style={styles.chartLyric}>
                {part}
              </Text>
            );
          })}
        </Text>
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{result.title}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => {
              if (isEditing) {
                saveChanges();
              } else {
                setIsEditing(true);
              }
            }}
            disabled={isSaving}
          >
            <Text style={styles.modeButtonText}>
              {isEditing ? (isSaving ? "Salvando..." : "Salvar") : "Editar"}
            </Text>
          </TouchableOpacity>
          {isEditing && (
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
        <TonePickerModal currentNote={selectedNote} onSelect={changeTone} theme={theme} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {isEditing ? (
          <TextInput
            style={styles.notepadInput}
            multiline
            value={arrangementText}
            onChangeText={handleEditText}
            placeholder="Digite seu arranjo. Ex: /Fa# Um grande /Si sinal"
            placeholderTextColor={theme.colors.placeholder}
            textAlignVertical="top"
          />
        ) : (
          <View style={styles.chartContainer}>
            {renderFormattedChordChart(arrangementText)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
