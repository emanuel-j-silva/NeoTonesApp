import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { dependencies } from "../../app/dependencies";
import { Music } from "../../domain/music/entities/Music";

export function HomeScreen() {

  const [musics, setMusics] =
    useState<Music[]>([]);
    
    useEffect(() => {
        loadMusics();
    }, []);

  async function loadMusics() {
    const result = await dependencies.listMusicsUseCase.findAll();
    setMusics(result);
  }

  return (
    <SafeAreaView>

      <Text>NeoTones</Text>

      <FlatList data={musics} keyExtractor={music => music.id} 
      renderItem={({ item }) => (
      <Text>
        {`${item.title} - ${item.arrangement.getTone().getNote().getSymbol()}`}
      </Text>
        )}
      />

    </SafeAreaView>
  );
}