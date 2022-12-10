import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { DebtsContext } from '../../../contexts/debtsContext';
import { useNavigation } from '@react-navigation/native';
import BarChart from '../../global/bar-chart';
import { StackNavigationProp } from '@react-navigation/stack';

const HomeDebts: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const { debts } = React.useContext(DebtsContext);
  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={style.container} onTouchEnd={() => { navigation.navigate("DebtScreen") }}>
      <Text style={style.title}>Valores restantes</Text>
      <BarChart itens={debts.map(debt => ({
        color: debt.institution.color,
        icon: (
          <View style={style.align}>
            <Image source={debt.institution.logo} style={style.logo} />
            {debt.institution.name == "OUTRO" && (<Text style={style.text}>{debt.institutionName}</Text>)}
          </View>
        ),
        total: debt.totalRemain
      }))} />

      <TouchableOpacity style={style.containerBalance} onPress={() => { navigation.navigate("DebtScreen") }}>
        <Text style={style.textTitle}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeDebts;