import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { FinancesBalanceEntity } from '../../../interfaces/services/finance.interface';
import { getPipeMoneyString } from '../../../utils/money.util';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";

const FinanceHistoricCard: React.FC<{ finance: FinancesBalanceEntity }> = ({ finance }) => {

  const navigation = useNavigation<StackNavigationProp<any>>()
  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const openFinance = () => {
    navigation.navigate("FinanceScreen", { event: finance.type, finance })
  }

  return (
    <TouchableOpacity onPress={openFinance}>
      <View style={style.itens}>
        <View style={style.itemContainer}>
          <View style={style.itemIcon}>
            <FontAwesome5 name={finance.category?.icon} color={theme.text.primary} size={20} />
          </View>
          <Text style={style.itemTitle}>{finance.name}</Text>
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