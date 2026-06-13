import { useEffect, useMemo, useState } from "react";
import {FlatList,Text, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList }from "../../../navigation/types";

import { dependencies } from "../../../app/dependencies";

import { Music } from "../../../domain/music/entities/Music";

import { SongCard } from "../../components/SongCard/SongCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";

import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";

import { Button } from "react-native";

type HomeScreenNavigationProp =
  NativeStackNavigationProp< RootStackParamList, "Home" >;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({
  navigation,
}: Props) {
  const { toggleTheme } = useTheme();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [musics, setMusics] =
    useState<Music[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadMusics();
  }, []);

  async function loadMusics() {
    const result =
      await dependencies.listMusicsUseCase.findAll();

    setMusics(result);
  }

  const filteredMusics = useMemo(() => {
    if (!search.trim()) {
      return musics;
    }

    return musics.filter((music) =>
      music.getTitle()
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [musics, search]);

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
        data={filteredMusics}
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