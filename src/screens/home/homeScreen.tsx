import React from 'react';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import HomeBalance from '../../components/home/home-balance';
import HomeBudget from '../../components/home/home-budget';
import HomeDebts from '../../components/home/home-debts';
import HomeFinanceHistoric from '../../components/home/home-finance-historic';
import HomeHeader from '../../components/home/home-header';
import { ThemeContext } from '../../contexts/themeContext';
import { styles } from './styles';

const HomeScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <SafeAreaView style={style.container}>
      <HomeHeader />
      <ScrollView style={style.containerScroll}>
        <HomeBalance />
        <HomeBudget />
        <HomeFinanceHistoric />
        <HomeDebts />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;