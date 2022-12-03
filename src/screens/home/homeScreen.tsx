import React from 'react';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import BarChart from '../../components/global/bar-chart';
import HomeBalance from '../../components/home/home-balance';
import HomeBudget from '../../components/home/home-budget';
import HomeFinanceHistoric from '../../components/home/home-finance-historic';
import HomeHeader from '../../components/home/home-header';
import { DEBTS_INSTITUTION } from '../../constants/debts.constants';
import { ThemeContext } from '../../contexts/themeContext';
import { styles } from './styles';

const HomeScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const teste = DEBTS_INSTITUTION.map((debt, i) => ({ icon: <Image source={debt.logo} style={{ width: 30, height: 30, borderRadius: 5, marginBottom: 3 }} />, total: i + 100, color: debt.color }))

  return (
    <SafeAreaView style={style.container}>
      <HomeHeader />
      <ScrollView style={style.containerScroll}>
        <HomeBalance />
        <HomeBudget />
        <HomeFinanceHistoric />
        <BarChart itens={teste} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;