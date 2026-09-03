import { StyleSheet } from "react-native";
import { AppTheme } from "../../../shared/theme/AppTheme";

export const createStyles = (
  theme: AppTheme
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    /* ─── Header ─── */
    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 4,
    },

    title: {
      fontSize: 26,
      fontWeight: "700",
      letterSpacing: -0.5,

      color: theme.colors.text,
    },

    /* ─── Content ─── */
    content: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 40,
    },

    /* ─── Melody line ─── */
    melodyContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,

      marginBottom: 6,
      paddingVertical: 4,
    },

    melodyNote: {
      paddingHorizontal: 8,
      paddingVertical: 3,

      borderRadius: 6,
      backgroundColor: theme.colors.primary + "18",
    },

    melodyNoteText: {
      fontFamily: "monospace",
      fontSize: 14,
      fontWeight: "700",
      letterSpacing: 0.5,

      color: theme.colors.primary,
    },

    /* ─── Phrase (section marker / lyrics) ─── */
    phrase: {
      fontSize: 16,
      lineHeight: 24,

      color: theme.colors.text,

      marginTop: 16,
      marginBottom: 8,
    },

    /* ─── Section marker (INTRO, CLARINETE, etc.) ─── */
    sectionMarker: {
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1.5,
      textTransform: "uppercase",

      color: theme.colors.secondaryText,

      marginTop: 24,
      marginBottom: 8,

      paddingBottom: 6,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
    },

    /* ─── Annotated Phrase ─── */
    annotatedPhraseContainer: {
      marginTop: 16,
      marginBottom: 8,
    },

    noteAnnotationLine: {
      fontFamily: "monospace",
      fontSize: 13,
      fontWeight: "700",
      lineHeight: 18,
      letterSpacing: 0.3,

      color: theme.colors.primary,

      marginBottom: 2,
    },

    annotatedPhraseText: {
      fontFamily: "monospace",
      fontSize: 13,
      lineHeight: 20,
      letterSpacing: 0.3,

      color: theme.colors.text,
    },
  });