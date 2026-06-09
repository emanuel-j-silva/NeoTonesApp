import { TextInput, View } from "react-native";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar músicas..."
        placeholderTextColor={
          theme.colors.placeholder
        }
        style={styles.input}
      />
    </View>
  );
}