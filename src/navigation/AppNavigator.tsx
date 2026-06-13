import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../presentation/screens/LibraryScreen";
import { ArrangementScreen } from "../presentation/screens/ArrangementScreen";

import { RootStackParamList } from "./types";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Arrangement"
          component={ArrangementScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}