import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15
        },
        containerIcon: {
            width: 35,
            height: 35,
            borderRadius: 35,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,225,0.5)'
        },
        title: {
            color: theme.text.primary,
            fontWeight: 'bold',
            fontSize: 20
        }
    })
};
