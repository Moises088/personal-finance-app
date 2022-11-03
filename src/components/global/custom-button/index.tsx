import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { CustomButtonProps } from '../../../types/screens/custom-button.type';
import { styles } from './styles';

const CustomButton: React.FC<CustomButtonProps> = (props: CustomButtonProps) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[style.btnContainer, style[props.customStyle], props?.style ?? {}]}
      onPress={props.onPress}
    >
      <View>
        <Text style={style.text}>{props.buttonText}</Text>
      </View>
    </TouchableOpacity >
  );
}

export default CustomButton;