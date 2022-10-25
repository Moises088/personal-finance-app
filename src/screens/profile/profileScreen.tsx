import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import ProfileHeader from '../../components/profile/profile-header';
import ProfileItem from '../../components/profile/profile-item';
import { PROFILE_LIST } from '../../constants/profile.constants';
import { ThemeContext } from '../../contexts/themeContext';
import { styles } from './styles';

const ProfileScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <SafeAreaView style={style.container}>
      <ProfileHeader />

      <View style={style.containerList}>
        <FlatList
          data={PROFILE_LIST}
          renderItem={({ item }) => <ProfileItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;