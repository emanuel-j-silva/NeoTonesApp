import { StyleSheet } from "react-native";

import { AppTheme } from "../../../shared/theme/AppTheme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",

      backgroundColor: theme.colors.surface,

      borderWidth: 1,
      borderColor:theme.colors.border,
      borderRadius: 16,

      padding: 16,
      marginBottom: 12,
    },

    iconContainer: {
      width: 48,
      height: 48,

      borderRadius: 12,

      justifyContent: "center",
      alignItems: "center",

      backgroundColor: theme.colors.iconBackground,

      marginRight: 12,
    },

    icon: {
      fontSize: 22,
    },

    content: {
      flex: 1,
    },

    title: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
    },

    subtitle: {
      marginTop: 4,
      fontSize: 13,
      color: theme.colors.secondaryText,
    },
  });