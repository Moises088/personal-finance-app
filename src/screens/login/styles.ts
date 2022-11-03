import { StyleSheet, Dimensions } from 'react-native';
import { WINDOW_WIDTH } from '../../constants/screen.contants';
import { ThemesConfig } from '../../types/screens/themes.type';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            alignItems: "center",
            justifyContent: "center"
        },
        containerLogin: {
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            color: theme.text.primary,
            marginBottom: 15,
            fontSize: 18,
            fontWeight: "700"
        },
        ballLayout: {
            position: "absolute",
            width: (WINDOW_WIDTH / 1.5) + 60,
            height: (WINDOW_WIDTH / 1.5) + 60,
            borderRadius: WINDOW_WIDTH,
            backgroundColor: theme.background.secondary,
            top: -60,
            right: -50
        },
        ballLayoutSecondary: {
            position: "absolute",
            width: (WINDOW_WIDTH / 2) + 20,
            height: (WINDOW_WIDTH / 2) + 20,
            borderRadius: WINDOW_WIDTH,
            backgroundColor: "#5a5c5f",
            top: -20,
            left: -10
        },
        containerButtons: {
            flex: 1,
            width: "96%",
            marginTop: 20
        }
    })
};
