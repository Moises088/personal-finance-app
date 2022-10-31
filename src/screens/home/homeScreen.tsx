import React from 'react';
import { SafeAreaView, View } from 'react-native';
import HomeBalance from '../../components/home/home-balance';
import HomeHeader from '../../components/home/home-header';
import { ThemeContext } from '../../contexts/themeContext';
import { styles } from './styles';

const HomeScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <SafeAreaView style={style.container}>
      <HomeHeader />

      <HomeBalance />
    </SafeAreaView>
  );
}

export default HomeScreen;