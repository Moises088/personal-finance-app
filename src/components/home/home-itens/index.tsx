import React from 'react';
import { View, Text } from 'react-native';
import { getCategoryIcon } from '../../../constants/category.constants';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';

const HomeItens: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const categoryIcon = getCategoryIcon('Casa');

  return (
    <View style={style.container}>
      <View style={style.containerTitle}>
        <View style={[style.containerIcon, { backgroundColor: categoryIcon?.background }]}>
          {categoryIcon?.icon(10)}
        </View>
        <Text style={style.text}>{categoryIcon?.label}</Text>
      </View>
      <Text style={style.text}>R$ 50,87</Text>
    </View>
  );
}

export default HomeItens;