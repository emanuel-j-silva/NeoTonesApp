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
      fontSize: 26,
      fontWeight: "700",
      letterSpacing: -0.5,
      color: theme.colors.text,
    },
    saveButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.primary,
    },
    saveButtonText: {
      color: "#FFFFFF",
      fontWeight: "700",
      fontSize: 14,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 40,
    },
    blockCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    noteCard: {
      borderColor: theme.colors.primary + "60",
      backgroundColor: theme.colors.primary + "08",
    },
    sectionCard: {
      backgroundColor: theme.colors.iconBackground,
    },
    blockHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    typeSelectorRow: {
      flexDirection: "row",
      gap: 6,
    },
    typeButton: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
      backgroundColor: theme.colors.iconBackground,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    typeButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    typeButtonText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.secondaryText,
    },
    typeButtonTextActive: {
      color: "#FFFFFF",
    },
    deleteButton: {
      padding: 4,
    },
    deleteButtonText: {
      fontSize: 16,
      color: theme.colors.secondaryText,
      fontWeight: "700",
    },
    blockInput: {
      fontSize: 16,
      color: theme.colors.text,
      minHeight: 40,
      paddingTop: 4,
    },
    noteInput: {
      fontFamily: "monospace",
      fontWeight: "700",
      color: theme.colors.primary,
    },
    sectionInput: {
      fontFamily: "monospace",
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: theme.colors.primary,
    },
    footerActions: {
      gap: 10,
      marginTop: 10,
    },
    addButton: {
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: "dashed",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
    },
    addButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.primary,
    },
  });
