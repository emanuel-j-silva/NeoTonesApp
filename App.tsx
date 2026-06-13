import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/shared/theme/ThemeProvider';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider >
      <SafeAreaProvider >
        <AppNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
