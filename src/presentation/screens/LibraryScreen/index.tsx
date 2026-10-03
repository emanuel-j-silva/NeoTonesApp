import { useState } from "react";
import { FlatList, Text, View, TouchableOpacity, TextInput, Modal, Alert, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";

import { SongCard } from "../../components/SongCard/SongCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useLibraryViewModel } from "../../viewmodels/useLibraryViewModel";

import { useTheme } from "../../../shared/theme/ThemeProvider";
import { createStyles } from "./styles";
import { darkTheme } from "../../../shared/theme/darkTheme";

type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({
  navigation,
}: Props) {
  const { theme, toggleTheme } = useTheme();
  const styles = createStyles(theme);

  const { musics, search, setSearch, createNewMusic, deleteMusic } = useLibraryViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  async function handleCreate() {
    if (!newTitle.trim()) {
      Alert.alert("Erro", "Digite o título da música.");
      return;
    }
    try {
      const musicId = await createNewMusic(newTitle);
      setNewTitle("");
      setModalVisible(false);
      navigation.navigate("Arrangement", { musicId });
    } catch (e: any) {
      Alert.alert("Erro", e.message ?? "Não foi possível criar a música.");
    }
  }

  function handleDelete(id: string, title: string) {
    Alert.alert(
      "Excluir Música",
      `Deseja realmente excluir "${title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteMusic(id);
            } catch (e: any) {
              Alert.alert("Erro", "Não foi possível excluir a música.");
            }
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          NeoTones
        </Text>
        <View style={styles.headerRight}>
          <View style={styles.themeToggleRow}>
            <Text style={styles.themeLabel}>{theme === darkTheme ? "🌙" : "☀️"}</Text>
            <Switch
              value={theme === darkTheme}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: theme.colors.primary }}
              thumbColor={"#f4f3f4"}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ Nova</Text>
          </TouchableOpacity>
        </View>
      </View>

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
            onDelete={() => handleDelete(item.getId(), item.getTitle())}
          />
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Música</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Título da música"
              placeholderTextColor={theme.colors.placeholder}
              value={newTitle}
              onChangeText={setNewTitle}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => {
                  setNewTitle("");
                  setModalVisible(false);
                }}
              >
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.confirmBtn]}
                onPress={handleCreate}
              >
                <Text style={styles.confirmBtnText}>Criar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
