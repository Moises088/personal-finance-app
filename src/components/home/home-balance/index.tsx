import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../../constants/colors';
import { FinancesContext } from '../../../contexts/financesContext';
import { getPipeMoneyString } from '../../../utils/money.util';

const HomeBalance: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const { finances } = React.useContext(FinancesContext);

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <Text style={style.textTitle}>Saldo</Text>
      </View>
      <View style={style.containerValue}>
        <Text style={style.textValue}>R$ {getPipeMoneyString(finances?.total)}</Text>
      </View>
      <View style={style.containerBalance}>

        <View style={[style.containerBalanceSide]}>
          <View style={[style.containerIcon, { backgroundColor: COLOR_SUCCESS }]}>
            <Feather name="trending-up" size={15} color="#FFF" />
          </View>
          <Text style={style.textBalance}>R$ {getPipeMoneyString(finances?.totalIncome)}</Text>
        </View>

        <View style={style.containerBalanceSide}>
          <View style={[style.containerIcon, { backgroundColor: COLOR_DANGER }]}>
            <Feather name="trending-down" size={15} color="#FFF" />
          </View>
          <Text style={style.textBalance}>R$ {getPipeMoneyString(finances?.totalExpense)}</Text>
        </View>
      </View>
    </View>
  );
}

export default HomeBalance;