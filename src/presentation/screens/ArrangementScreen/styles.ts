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
      paddingTop: 8,
      paddingBottom: 40,
    },

    /* ─── Section Header / Separator ─── */
    sectionContainer: {
      marginTop: 24,
      marginBottom: 12,
    },

    sectionMarkerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    sectionBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: theme.colors.primary + "20",
    },

    sectionMarkerText: {
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1.5,
      textTransform: "uppercase",
      color: theme.colors.primary,
    },

    sectionDividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },

    /* ─── Standalone Melody ─── */
    melodyRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 8,
      marginVertical: 6,
    },

    melodyText: {
      fontFamily: "monospace",
      fontSize: 16,
      fontWeight: "700",
      letterSpacing: 0.5,
      color: theme.colors.primary,
    },

    /* ─── Melody Annotation Badge ─── */
    annotationBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
      backgroundColor: theme.colors.iconBackground,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    annotationBadgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.secondaryText,
    },

    /* ─── Plain Phrase ─── */
    phrase: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
      marginVertical: 6,
    },

    /* ─── Annotated Phrase ─── */
    annotatedPhraseContainer: {
      marginVertical: 8,
    },

    noteAnnotationLine: {
      fontFamily: "monospace",
      fontSize: 13,
      fontWeight: "700",
      lineHeight: 18,
      letterSpacing: 0.5,
      color: theme.colors.primary,
      marginBottom: 2,
    },

    annotatedPhraseText: {
      fontFamily: "monospace",
      fontSize: 16,
      fontWeight: "500",
      lineHeight: 24,
      letterSpacing: 0.5,
      color: theme.colors.text,
    },
  });
