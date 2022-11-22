import React from 'react';
import { View, Text, Image } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { FinancesBalanceEntity } from '../../../interfaces/services/finance.interface';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { getPipeMoneyString } from '../../../utils/money.util';
import { COLOR_DANGER } from '../../../constants/colors';
import { getPipeTransformDateStringExtense } from '../../../utils/date.util';

const BACKGROUN_IMAGE = require("../../../../assets/imgs/waves.png")

/**
 * @image author https://www.freepik.com/free-vector/wavy-smooth-lines-pattern-background_2451587.htm#query=wave%20line&position=1&from_view=keyword
 */
const HomeFinanceItens: React.FC<{ item: FinancesBalanceEntity }> = ({ item }) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <View style={style.container}>
      <Image source={BACKGROUN_IMAGE} style={style.backgroundImage} />
      <View style={style.containerTitle}>
        <View style={[style.containerIcon, { backgroundColor: item.category?.color ?? theme.background.primary }]}>
          {item.category && (<FontAwesome5 name={item.category.icon} size={22} color={theme.text.primary} />)}
        </View>
        <Text style={style.text}>{item.name}</Text>
      </View>
      <View style={style.containerMoney}>
        <Text style={[style.text, { color: item.type == "INCOME" ? theme.text.primary : COLOR_DANGER, fontSize: 22 }]}>
          {item.type == "INCOME" ? "+" : "-"} R$ {getPipeMoneyString(item.value)}
        </Text>
      </View>
      <View style={style.containerDate}>
        <Text style={{ color: theme.text.primary }} >{getPipeTransformDateStringExtense(item.createdAt)}</Text>
      </View>
    </View>
  );
}

export default HomeFinanceItens;