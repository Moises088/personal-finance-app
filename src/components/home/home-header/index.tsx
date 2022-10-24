import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';

const HomeHeader: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <View style={style.container}>
      
    </View>
  );
}

export default HomeHeader;