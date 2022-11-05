import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';
import Constants from 'expo-constants';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 6,
        },
        containerTitle: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        text: {
            color: theme.text.primary
        },
        containerIcon: {
            width: 20,
            height: 20,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 7
        }
    })
};