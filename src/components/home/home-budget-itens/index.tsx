import React from 'react';
import { View, Text, Image } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { getPipeMoneyString } from '../../../utils/money.util';
import { COLOR_DANGER } from '../../../constants/colors';
import { getPipeTransformDateStringExtense } from '../../../utils/date.util';
import { BudgetsBalanceCategory } from '../../../interfaces/services/budget.interface';
import { styles } from './styles';
import ProgressBar from '../../global/progress-bar';

const BACKGROUN_IMAGE = require("../../../../assets/imgs/waves.png")

/**
 * @image author https://www.freepik.com/free-vector/wavy-smooth-lines-pattern-background_2451587.htm#query=wave%20line&position=1&from_view=keyword
 */
const HomeBudgetItens: React.FC<{ item: BudgetsBalanceCategory }> = ({ item }) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const progress = parseFloat(((item.used * 100) / item.total).toFixed(2));

  const Icon: React.FC = () => {
    if (item.categoryId) return <FontAwesome5 name={item.category?.icon} size={18} color={theme.text.primary} />
    if (item.debtId) return <Image source={item.debt?.logo} style={style.image} />
    return <View />
  }

  return (
    <View style={style.container}>
      <Image source={BACKGROUN_IMAGE} style={style.backgroundImage} />
      <View style={style.containerTitle}>
        <View style={[style.containerIcon, { backgroundColor: item.category?.color ?? theme.background.primary }]}>
          <Icon />
        </View>
        <Text style={style.text}>{item.category?.name}</Text>
      </View>
      <View style={style.containerMoney}>
        <Text style={style.label}>Restam</Text>
        <Text style={[style.text, { color: theme.text.primary, fontSize: 18 }]}>
          R$ {getPipeMoneyString(item.total - item.used)}
        </Text>
      </View>
      <View style={style.containerProgress}>
        <ProgressBar
          backColor={theme.background.secondary}
          barColor={item.category?.color ?? theme.button.primary}
          progress={progress}
          barText={`${progress}% (R$ ${getPipeMoneyString(item.used)})`}
        />
      </View>
    </View>
  );
}

export default HomeBudgetItens;