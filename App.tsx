import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthProvider from './src/contexts/authContext';
import BudgetsProvider from './src/contexts/budgetsContext';
import FinancesProvider from './src/contexts/financesContext';
import ThemeProvider from './src/contexts/themeContext';
import Routes from './src/routes/index.routes';
import * as Updates from 'expo-updates';

export default function App() {

  React.useEffect(() => {
    updateApp()
  }, [])

  const updateApp = async () =>  {
    try {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (err) {
    }
  }
  
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
