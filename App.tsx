import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/presentation/screens/LibraryScreen/LibraryScreen';
import { ThemeProvider } from './src/shared/theme/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider >
      <SafeAreaProvider >
        <HomeScreen />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
