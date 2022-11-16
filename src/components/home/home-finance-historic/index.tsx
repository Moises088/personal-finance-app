import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import HomeItens from '../home-itens';
import { FinancesContext } from '../../../contexts/financesContext';

const HomeFinanceHistoric: React.FC = () => {

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
      <TouchableOpacity style={style.containerBalance}>
        <Text style={style.textTitle}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeFinanceHistoric;