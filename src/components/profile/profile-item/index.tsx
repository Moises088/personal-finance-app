import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ProfileItemProps } from '../../../interfaces/screens/profile.interface';

const ProfileItem: React.FC<{ item: ProfileItemProps }> = ({ item }) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const navigate = () => {
    navigation.navigate(item.navigate)
  }

  return (
    <TouchableOpacity onPress={navigate}>
      <View style={style.container}>
        <View style={style.containerIconText}>
          <View style={style.icon}>
            {item.icon(theme.text.primary, 20)}
          </View>
          <Text style={[style.text]}>{item.title}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={18} color="#868686" />
      </View>

      {item.divisor && (<View style={style.divisor} />)}
    </TouchableOpacity>
  );
}

export default ProfileItem;