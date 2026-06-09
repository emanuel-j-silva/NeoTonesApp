import { StyleSheet } from "react-native";
import { AppTheme } from "../../../shared/theme/AppTheme";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },

    input: {
      height: 48,

      backgroundColor: theme.colors.surface,
      color: theme.colors.text,

      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 12,

      paddingHorizontal: 16,
      fontSize: 16,
    },
  });