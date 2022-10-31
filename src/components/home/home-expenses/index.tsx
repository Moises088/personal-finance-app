import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import HomeItens from '../home-itens';

const HomeExpenses: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [expenses, setExpenses] = React.useState<any[]>([])

  React.useEffect(() => {
    const getExpenses = [1, 2, 3, 4, 5, 6, 7];
    setExpenses(getExpenses.slice(0, 5))
  }, [])

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <Text style={style.textTitle}>Despesas</Text>
      </View>
      <View style={style.containerValue}>
        {expenses.map(() => (<HomeItens />))}
      </View>
      <TouchableOpacity style={style.containerBalance}>
        <Text style={style.textTitle}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeExpenses;