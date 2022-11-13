import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/contexts/authContext';
import FinancesProvider from './src/contexts/financesContext';
import ThemeProvider from './src/contexts/themeContext';
import Routes from './src/routes/index.routes';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FinancesProvider>
          <NavigationContainer>
            <Routes />
            <StatusBar backgroundColor='#141b26' style='light' />
          </NavigationContainer>
        </FinancesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
