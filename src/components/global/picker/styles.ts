import { StyleSheet } from 'react-native';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        containerValue: {
            // flex: 1,
            width: "100%",
            // backgroundColor: 'red',
            height: 40,
            alignItems: 'center',
            // justifyContent: 'center',
            flexDirection: 'row'
        },
        text: {
            color: theme.text.primary,
            fontSize: 17
        },
        containerModal: {
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGTH - 120,
            backgroundColor: theme.background.tertiary,
            position: 'absolute',
            bottom: 0,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 20
        },
        backdrop: {
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: 'rgba(10, 10, 10, 0.8)'
        },
        title: {
            color: theme.text.primary,
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 10
        },
        checkText: {
            color: theme.text.primary,
            textDecorationLine: "none",
            fontSize: 19,
        }
    })
};