import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { FinancesBalanceEntity } from '../../../interfaces/services/finance.interface';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { getPipeMoneyString } from '../../../utils/money.util';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../../constants/colors';

const HomeItens: React.FC<{ item: FinancesBalanceEntity }> = ({ item }) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <View style={style.container}>
      <View style={style.containerTitle}>
        <View style={[style.containerIcon, { backgroundColor: item.category?.color ?? theme.background.primary }]}>
          {item.category && (<FontAwesome5 name={item.category.icon} size={14} color={theme.text.primary} />)}
        </View>
        <Text style={style.text}>{item.name}</Text>
      </View>
      <Text style={[style.text, { color: item.type == "INCOME" ? COLOR_SUCCESS : COLOR_DANGER }]}>
        R$ {getPipeMoneyString(item.value)}
      </Text>
    </View>
  );
}

export default HomeItens;