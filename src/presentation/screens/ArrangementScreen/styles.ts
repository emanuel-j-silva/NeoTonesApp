import { StyleSheet } from "react-native";
import { AppTheme } from "../../../shared/theme/AppTheme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 4,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      letterSpacing: -0.5,
      color: theme.colors.text,
      flex: 1,
    },
    headerActions: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    modeButton: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 8,
      backgroundColor: theme.colors.primary,
    },
    modeButtonText: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 13,
    },
    cancelButton: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 8,
      backgroundColor: theme.colors.iconBackground,
    },
    cancelButtonText: {
      color: theme.colors.secondaryText,
      fontWeight: "600",
      fontSize: 13,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 60,
      flexGrow: 1,
    },
    notepadInput: {
      fontFamily: "monospace",
      fontSize: 16,
      lineHeight: 28,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      minHeight: 450,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    chartContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    chartLine: {
      fontFamily: "monospace",
      fontSize: 16,
      lineHeight: 30,
      color: theme.colors.text,
      marginBottom: 6,
    },
    inlineChord: {
      fontFamily: "monospace",
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.primary,
      backgroundColor: theme.colors.primary + "15",
      paddingHorizontal: 4,
      borderRadius: 4,
    },
    chartLyric: {
      fontFamily: "monospace",
      fontSize: 16,
      color: theme.colors.text,
    },
    sectionContainer: {
      marginTop: 18,
      marginBottom: 10,
    },
    sectionMarkerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    sectionBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
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
  });
