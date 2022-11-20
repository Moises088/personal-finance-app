import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { FinancesContext } from '../../../contexts/financesContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeItens from '../home-itens';

const HomeFinanceHistoric: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<any>>()

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const { finances } = React.useContext(FinancesContext);

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <Text style={style.textTitle}>Histórico</Text>
      </View>
      <View style={style.containerValue}>
        {finances?.finances?.map((item, i) => i < 5 && (<HomeItens key={i} item={item} />))}
      </View>
      <TouchableOpacity style={style.containerBalance} onPress={() => navigation.navigate("FinanceHistoricScreen")}>
        <Text style={style.textTitle}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeFinanceHistoric;