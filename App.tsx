import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/contexts/authContext';
import ThemeProvider from './src/contexts/themeContext';
import Routes from './src/routes/index.routes';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Routes />
          <StatusBar backgroundColor='#141b26' style='light' />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
