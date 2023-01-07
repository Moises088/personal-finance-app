import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import HomeBudgetItens from '../home-budget-itens';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BudgetsContext } from '../../../contexts/budgetsContext';
import { styles } from './styles';
import Carousel from '../../global/carousel';

const HomeBudget: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const navigation = useNavigation<StackNavigationProp<any>>()
  const { budgets } = React.useContext(BudgetsContext);

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <Text style={style.textTitle}>Orçamento</Text>
      </View>

      <View style={style.containerBudget}>
        <Carousel
          width={250}
          itens={
            budgets?.categories.map((budget, i) => i < 5 && (
              <HomeBudgetItens key={i} item={budget} />
            )) as JSX.Element[] ?? []
          }
        />
      </View>

      <TouchableOpacity style={style.containerBalance} onPress={() => { navigation.navigate("BudgetScreen") }}>
        <Text style={style.textTitle}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeBudget;