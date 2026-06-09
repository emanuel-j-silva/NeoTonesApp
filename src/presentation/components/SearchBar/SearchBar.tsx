import { TextInput, View } from "react-native";
import { styles } from "./styles";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar músicas..."
        style={styles.input}
      />
    </View>
  );
}