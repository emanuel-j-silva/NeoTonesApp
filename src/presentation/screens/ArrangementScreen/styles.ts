import { StyleSheet } from "react-native";
import { AppTheme } from "../../../shared/theme/AppTheme";

export const createStyles = (
  theme: AppTheme
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        theme.colors.background,

      paddingHorizontal: 16,
    },

    title: {
      fontSize: 28,
      fontWeight: "700",

      color: theme.colors.text,

      marginTop: 8,
    },

    subtitle: {
      fontSize: 16,

      color:
        theme.colors.secondaryText,

      marginTop: 4,
      marginBottom: 16,
    },

    toneSelector: {
      paddingBottom: 16,
      gap: 8,
    },

    toneChip: {
      paddingHorizontal: 14,
      paddingVertical: 8,

      borderRadius: 20,

      backgroundColor:
        theme.colors.iconBackground,
    },

    selectedToneChip: {
      backgroundColor:
        theme.colors.primary,
    },

    toneChipText: {
      color: theme.colors.text,
      fontWeight: "600",
    },

    selectedToneChipText: {
      color: "#FFFFFF",
    },

    content: {
      paddingBottom: 32,
    },

    melody: {
      fontFamily: "monospace",

      fontSize: 18,

      color:
        theme.colors.primary,

      marginBottom: 8,
    },

    phrase: {
      fontSize: 22,

      lineHeight: 30,

      color:
        theme.colors.text,

      marginBottom: 24,
    },
  });