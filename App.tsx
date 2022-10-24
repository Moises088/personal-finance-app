import { NavigationContainer } from '@react-navigation/native';
import ThemeProvider from './src/contexts/themeContext';
import Routes from './src/routes/index.routes';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
