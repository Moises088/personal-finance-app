import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { HeaderStackProps } from '../../../interfaces/screens/header.interface';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';

const HeaderStack: React.FC<HeaderStackProps> = (props) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.containerIcon} onPress={props.onRequestClose}>
        <Feather name="arrow-left" size={24} color={theme.text.primary} />
      </TouchableOpacity>
      <Text style={style.title}>{props.title}</Text>
      <View style={{ width: 35 }} />
    </View>
  );
}

export default HeaderStack;