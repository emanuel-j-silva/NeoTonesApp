import { Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { TonePickerModal } from "../../components/TonePickerModal/TonePickerModal";
import { useArrangementViewModel } from "../../viewmodels/useArrangementViewModel";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";
import { BlockType, ArrangementBlock } from "../../../domain/music/entities/ArrangementBlock";

type ArrangementRouteProp = RouteProp<RootStackParamList, "Arrangement">;
type Props = { route: ArrangementRouteProp; navigation: any };

export function ArrangementScreen({ route }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const {
    result,
    selectedNote,
    blocks,
    changeTone,
    updateBlockContent,
    updateBlockType,
    addBlock,
    removeBlock,
    saveChanges,
    isSaving,
  } = useArrangementViewModel(route.params.musicId);

  if (!result || !selectedNote) {
    return null;
  }

  function renderBlock({ item }: { item: ArrangementBlock }) {
    const isNote = item.type === "notes";
    const isSection = item.type === "section";

    return (
      <View style={[styles.blockCard, isNote && styles.noteCard, isSection && styles.sectionCard]}>
        <View style={styles.blockHeaderRow}>
          <View style={styles.typeSelectorRow}>
            {(["lyrics", "notes", "section"] as BlockType[]).map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.typeButton, item.type === t && styles.typeButtonActive]}
                onPress={() => updateBlockType(item.id, t)}
              >
                <Text style={[styles.typeButtonText, item.type === t && styles.typeButtonTextActive]}>
                  {t === "lyrics" ? "Texto" : t === "notes" ? "Notas" : "Seção"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => removeBlock(item.id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={[styles.blockInput, isNote && styles.noteInput, isSection && styles.sectionInput]}
          multiline
          value={item.content}
          onChangeText={(text) => updateBlockContent(item.id, text)}
          placeholder={
            isNote ? "Ex: F# B C#m (Transponível)" : isSection ? "Ex: INTRO / REFRÃO" : "Digite a letra aqui..."
          }
          placeholderTextColor={theme.colors.placeholder}
          textAlignVertical="top"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{result.title}</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges} disabled={isSaving}>
          <Text style={styles.saveButtonText}>{isSaving ? "Salvando..." : "Salvar"}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
        <TonePickerModal currentNote={selectedNote} onSelect={changeTone} theme={theme} />
      </View>

      <FlatList
        data={blocks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={renderBlock}
        ListFooterComponent={
          <View style={styles.footerActions}>
            <TouchableOpacity style={styles.addButton} onPress={() => addBlock("lyrics")}>
              <Text style={styles.addButtonText}>+ Adicionar Linha de Texto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => addBlock("notes")}>
              <Text style={styles.addButtonText}>+ Adicionar Linha de Notas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => addBlock("section")}>
              <Text style={styles.addButtonText}>+ Adicionar Seção</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}
