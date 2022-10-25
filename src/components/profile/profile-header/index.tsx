import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

const ProfileHeader: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <View style={style.containerHeader}>
      <View style={style.profile}>
        <FontAwesome5 name="user-astronaut" size={38} color={theme.text.primary} />
      </View>

      <View style={style.containerInfo}>
        <Text style={[style.text, style.textBold, { fontSize: 16 }]}>Usuário não logado</Text>
        <Text style={[style.text, { fontSize: 12 }]}>Backup 12/08/2022 17:59</Text>
      </View>

      <TouchableOpacity style={style.btn}>
        <AntDesign name="logout" size={22} color={theme.text.primary} />
      </TouchableOpacity>
    </View>
  );
}

export default ProfileHeader;