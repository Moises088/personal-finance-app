import { StyleSheet } from 'react-native';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        itens: {
            marginVertical: 6,
            padding: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        itemContainer: {
            flexDirection: "row",
            alignItems: "center"
        },
        itemIcon: {
            width: 45,
            height: 45,
            borderRadius: 45,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.background.tertiary
        },
        itemTitle: {
            marginLeft: 8,
            color: theme.text.primary,
            fontSize: 19,
            letterSpacing: 1.05
        },
        itemValue: {
            color: theme.text.primary,
            letterSpacing: 1.05,
            marginTop: 20
        }
    })
};