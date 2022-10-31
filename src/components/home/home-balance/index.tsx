import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';

const HomeBalance: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <Text style={style.textTitle}>Saldo</Text>
      </View>
      <View style={style.containerValue}>
        <Text style={style.textValue}>R$ 100,00</Text>
      </View>
      <View style={style.containerBalance}>

        <View style={[style.containerBalanceSide]}>
          <View style={[style.containerIcon, { backgroundColor: '#0f993a' }]}>
            <Feather name="trending-up" size={15} color="#FFF" />
          </View>
          <Text style={style.textBalance}>R$ 1290,00</Text>
        </View>

        <View style={style.containerBalanceSide}>
          <View style={[style.containerIcon, { backgroundColor: '#d44' }]}>
            <Feather name="trending-down" size={15} color="#FFF" />
          </View>
          <Text style={style.textBalance}>R$ 1190,00</Text>
        </View>
      </View>
    </View>
  );
}

export default HomeBalance;