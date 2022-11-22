import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { FinancesContext } from '../../../contexts/financesContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeFinanceItens from '../home-finance-itens';
import Carousel from '../../global/carousel';

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
        <Carousel itens={
          finances?.finances?.map((item, i) => {
            if (i < 10) return <HomeFinanceItens key={i} item={item} />
          }) as JSX.Element[] ?? []
        }
          width={250}
        />
      </View>
      <TouchableOpacity style={style.containerBalance} onPress={() => navigation.navigate("FinanceHistoricScreen")}>
        <Text style={style.textTitle}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeFinanceHistoric;