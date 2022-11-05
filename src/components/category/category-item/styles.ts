import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            width: "94%",
            marginLeft: "3%",
            marginTop: 5,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: 6,
            paddingVertical: 10,
            borderRadius: 10
        },
        containerRow: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        containerIcon: {
            width: 30,
            height: 30,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center'
        },
        name: {
            color: theme.text.primary,
            marginLeft: 15,
            fontWeight: 'bold'
        }
    })
};