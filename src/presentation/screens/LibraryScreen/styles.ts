import { StyleSheet } from "react-native";
import { AppTheme } from "../../../shared/theme/AppTheme";

export const createStyles = (theme: AppTheme) =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,

    paddingHorizontal: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",

    marginTop: 8,
    marginBottom: 20,

    color: theme.colors.text,
  },
});