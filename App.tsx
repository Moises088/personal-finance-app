import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/contexts/authContext';
import BudgetsProvider from './src/contexts/budgetsContext';
import FinancesProvider from './src/contexts/financesContext';
import ThemeProvider from './src/contexts/themeContext';
import Routes from './src/routes/index.routes';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FinancesProvider>
          <BudgetsProvider>
            <NavigationContainer>
              <Routes />
              <StatusBar backgroundColor='#141b26' style='light' />
            </NavigationContainer>
          </BudgetsProvider>
        </FinancesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
