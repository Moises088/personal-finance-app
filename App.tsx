import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.routes';

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
