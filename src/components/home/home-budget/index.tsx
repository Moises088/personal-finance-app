import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BudgetPopup from '../../budget/budget-popup';
import { StackNavigationProp } from '@react-navigation/stack';
import BudgetCard from '../../budget/budget-card';

const HomeBudget: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <Text style={style.textTitle}>Orçamento</Text>
      </View>

      <BudgetPopup />

      <View style={style.containerBudget}>
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </View>

      <TouchableOpacity style={style.containerBalance} onPress={() => { navigation.navigate("BudgetScreen") }}>
        <Text style={style.textTitle}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeBudget;