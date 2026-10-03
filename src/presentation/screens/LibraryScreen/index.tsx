import { FlatList, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";

import { SongCard } from "../../components/SongCard/SongCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useLibraryViewModel } from "../../viewmodels/useLibraryViewModel";

import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";

type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({
  navigation,
}: Props) {
  const { toggleTheme } = useTheme();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { musics, search, setSearch } = useLibraryViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        NeoTones
      </Text>

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={musics}
        keyExtractor={(music) => music.getId()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SongCard
            title={item.getTitle()}
            tone={item.getArrangement()
              .getTone()
              .getNote()
              .getSymbol()}
            onPress={() =>
              navigation.navigate(
                "Arrangement",
                {
                  musicId: item.getId(),
                }
              )
            }
          />
        )}
      />
      <Button
        title="Trocar tema"
        onPress={toggleTheme}
      />
    </SafeAreaView>
  );
}
