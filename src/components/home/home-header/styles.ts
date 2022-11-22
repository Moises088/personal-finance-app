import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';
import Constants from 'expo-constants';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            paddingTop: 10,
            height: 80
        },
        containerButton: {
            width: 120,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
};