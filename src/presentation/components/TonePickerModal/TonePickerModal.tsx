import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

import { Note } from "../../../domain/music/entities/note/Note";
import { AppTheme } from "../../../shared/theme/AppTheme";

type Props = {
  currentNote: Note;
  onSelect: (note: Note) => void;
  theme: AppTheme;
};

export function TonePickerModal({
  currentNote,
  onSelect,
  theme,
}: Props) {
  const [visible, setVisible] = useState(false);

  const styles = createStyles(theme);

  function handleSelect(note: Note) {
    onSelect(note);
    setVisible(false);
  }

  return (
    <>
      <Pressable
        style={styles.trigger}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.triggerLabel}>
          Tom
        </Text>

        <View style={styles.triggerValueContainer}>
          <Text style={styles.triggerValue}>
            {currentNote.getSymbol()}
          </Text>
          <Text style={styles.triggerArrow}>▼</Text>
        </View>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setVisible(false)}
        >
          <Pressable style={styles.sheet}>
            <View style={styles.handle} />

            <Text style={styles.sheetTitle}>
              Selecionar Tom
            </Text>

            <FlatList
              data={Note.VALUES}
              numColumns={4}
              keyExtractor={(note) => note.getLetter()}
              columnWrapperStyle={styles.gridRow}
              contentContainerStyle={styles.grid}
              renderItem={({ item }) => {
                const isSelected =
                  currentNote.equalsNote(item);

                return (
                  <Pressable
                    style={[
                      styles.noteCell,
                      isSelected && styles.noteCellSelected,
                    ]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text
                      style={[
                        styles.noteCellText,
                        isSelected &&
                          styles.noteCellTextSelected,
                      ]}
                    >
                      {item.getSymbol()}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    /* ─── Trigger button ─── */
    trigger: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      backgroundColor: theme.colors.surface,

      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 14,

      paddingHorizontal: 16,
      paddingVertical: 12,

      marginBottom: 20,
    },

    triggerLabel: {
      fontSize: 14,
      color: theme.colors.secondaryText,
    },

    triggerValueContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    triggerValue: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.primary,
    },

    triggerArrow: {
      fontSize: 10,
      color: theme.colors.secondaryText,
    },

    /* ─── Modal ─── */
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },

    sheet: {
      backgroundColor: theme.colors.surface,

      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,

      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 12,
    },

    handle: {
      alignSelf: "center",

      width: 40,
      height: 4,
      borderRadius: 2,

      backgroundColor: theme.colors.border,

      marginBottom: 20,
    },

    sheetTitle: {
      fontSize: 18,
      fontWeight: "600",

      color: theme.colors.text,

      textAlign: "center",
      marginBottom: 20,
    },

    /* ─── Grid ─── */
    grid: {
      gap: 10,
    },

    gridRow: {
      gap: 10,
      justifyContent: "center",
    },

    noteCell: {
      flex: 1,
      maxWidth: 80,

      alignItems: "center",
      justifyContent: "center",

      paddingVertical: 14,
      borderRadius: 12,

      backgroundColor: theme.colors.iconBackground,
    },

    noteCellSelected: {
      backgroundColor: theme.colors.primary,
    },

    noteCellText: {
      fontSize: 16,
      fontWeight: "600",

      color: theme.colors.text,
    },

    noteCellTextSelected: {
      color: "#FFFFFF",
    },
  });
