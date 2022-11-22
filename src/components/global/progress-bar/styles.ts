import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        backDrop: {
            width: "100%",
            borderRadius: 10,
            height: 18,
            position: "relative"
        },
        bar: {
            borderRadius: 10,
            height: 18
        },
        barText: {
            width: "100%",
            borderRadius: 10,
            height: 18,
            position: "absolute",
            paddingHorizontal: 5,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            color: theme.text.primary,
            fontSize: 11
        }
    })
};
