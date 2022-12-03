import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { FinancesBalanceEntity } from '../../../interfaces/services/finance.interface';
import { getPipeMoneyString } from '../../../utils/money.util';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { getPipeCustomDateString, getPipeTransformDateStringExtense } from '../../../utils/date.util';

const FinanceHistoricCard: React.FC<{ finance: FinancesBalanceEntity }> = ({ finance }) => {

  const navigation = useNavigation<StackNavigationProp<any>>()
  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const openFinance = () => {
    navigation.navigate("FinanceScreen", { event: finance.type, finance })
  }

  const name = () => {
    if (finance?.category?.name) return finance.category.name;
    if (finance?.bill?.name) return finance.bill.name;
    return ""
  }

  const icon = () => {
    if (finance?.category?.icon) return <FontAwesome5 name={finance.category?.icon} color={theme.text.primary} size={20} />;
    if (finance?.bill?.logo) return (
      <View style={[style.card, { backgroundColor: finance.bill.color }]}>
        <Image style={style.cardImage} source={finance.bill.logo} />
      </View>
    )
    return <View />
  }

  return (
    <TouchableOpacity onPress={openFinance}>
      <View style={style.itens}>

        <View style={style.itemContainer}>
          <View style={style.itemIcon}>
            {icon()}
          </View>
          <View style={style.itemContainerTitle}>
            <Text style={style.itemTitle} numberOfLines={1}>{name()}</Text>
            <Text style={[style.itemTitle, { fontSize: 12 }]} numberOfLines={1}>
              <Text style={{ color: finance.isPaid ? COLOR_SUCCESS : COLOR_DANGER }}>{finance.isPaid ? "Pago" : "Não pago"}</Text>
              <Text> • </Text>
              <Text>{getPipeTransformDateStringExtense(finance.paidAt)}</Text>
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={[style.itemValue, { color: finance.type == "INCOME" ? theme.text.primary : COLOR_DANGER }]}>
            {finance.type == "INCOME" ? "+" : "-"} R$ {getPipeMoneyString(finance.value)}
          </Text>
          <Feather
            name={finance.type == "INCOME" ? "trending-up" : "trending-down"}
            size={15}
            color={finance.type == "INCOME" ? COLOR_SUCCESS : COLOR_DANGER}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default FinanceHistoricCard;