import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../types/screens/themes.type';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            marginHorizontal: 12,
            borderWidth: .5,
            borderColor: theme.background.secondary,
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 20,
            marginTop: 10
        },
        containerHeader: {
            padding: 5,
            paddingHorizontal: 10,
            backgroundColor: theme.background.tertiary
        },
        textTitle: {
            color: theme.text.tertiary
        },
        containerValue: {
            padding: 20,
            paddingHorizontal: 10,
            paddingBottom: 14
        },
        containerBalance: {
            padding: 8,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)'
        }
    })
};