import { useEffect, useMemo, useState } from "react";
import {FlatList,Text, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { dependencies } from "../../../app/dependencies";

import { Music } from "../../../domain/music/entities/Music";

import { SongCard } from "../../components/SongCard/SongCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";

import { styles } from "./styles";

export function HomeScreen() {
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
      music.title
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
        keyExtractor={(music) => music.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SongCard
            title={item.title}
            tone={item.arrangement
              .getTone()
              .getNote()
              .getSymbol()}
            onPress={() => {
              console.log(item.title);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}