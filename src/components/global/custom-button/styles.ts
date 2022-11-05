import { StyleSheet, Dimensions } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        btnContainer: {
            width: "100%",
            height: 44,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center"
        },
        btn: {
            backgroundColor: theme.button.primary,
        },
        outline: {
            borderWidth: 1,
            borderColor: theme.button.primary,
            backgroundColor: "rgba(255,255,255,0.1)"
        },
        text: {
            color: theme.text.primary
        }
    })
};
