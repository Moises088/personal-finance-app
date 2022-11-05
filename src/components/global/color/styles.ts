import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';
import Constants from 'expo-constants'
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../../constants/screen.contants';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            padding: 10,
            paddingTop: Constants.statusBarHeight
        },
        containerIcon: {
            width: 40,
            height: 40,
            borderRadius: 40,
            borderWidth: 4,
            marginLeft: 10,
            marginBottom: 15
        }
    })
};
