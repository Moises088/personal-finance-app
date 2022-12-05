import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

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
        },
        textValue: {
            color: theme.text.primary,
            fontSize: 22,
            fontWeight: "bold"
        },
        containerBalance: {
            padding: 12,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)'
            // borderTopWidth: .5,
            // borderColor: theme.background.secondary,
        },
        containerBalanceSide: {
            width: '50%',
            flexDirection: 'row',
            alignItems:'center',
        },
        containerIcon: {
            width: 25,
            height: 25,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center'
        },
        textBalance: {
            color: theme.text.primary,
            marginLeft: 8
        }
    })
};