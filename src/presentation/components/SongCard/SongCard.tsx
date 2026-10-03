import { Pressable, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";

type Props = {
  title: string;
  tone: string;
  onPress: () => void;
  onDelete?: () => void;
};

export function SongCard({ title, tone, onPress, onDelete }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🎵</Text>
      </View>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subtitle}>
          Tom original: {tone}
        </Text>
      </View>

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      )}
    </Pressable>
  );
}
