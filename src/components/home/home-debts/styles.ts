import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            width: WINDOW_WIDTH,
        },
        logo: {
            width: 30,
            height: 30,
            borderRadius: 5,
            marginBottom: 3
        },
        title: {
            color: theme.text.primary,
            fontSize: 16,
            opacity: 0.7,
            marginLeft: 20
        },
        containerBalance: {
            padding: 12,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 0,
            borderRadius: 10,
            margin: 20,
            marginTop: 10
        },
        textTitle: {
            color: theme.text.tertiary
        },
    })
};