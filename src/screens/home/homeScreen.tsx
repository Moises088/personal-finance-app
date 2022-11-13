import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import HomeBalance from '../../components/home/home-balance';
import HomeExpenses from '../../components/home/home-expenses';
import HomeHeader from '../../components/home/home-header';
import HomeIncomes from '../../components/home/home-incomes';
import { FinancesContext } from '../../contexts/financesContext';
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
        {/* <HomeExpenses />
        <HomeIncomes /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;