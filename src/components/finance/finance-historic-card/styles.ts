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
            justifyContent: "space-between",
        },
        itemContainer: {
            flexDirection: "row",
            alignItems: "center",
            width: "65%",
        },
        itemIcon: {
            width: 45,
            height: 45,
            borderRadius: 45,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.background.tertiary
        },
        itemContainerTitle: {
            width: "100%"
        },
        itemTitle: {
            marginLeft: 8,
            color: theme.text.primary,
            fontSize: 17,
            letterSpacing: 1
        },
        itemValue: {
            color: theme.text.primary,
            letterSpacing: 1.05,
            marginTop: 20
        },
        card: {
            width: 35,
            height: 22,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        cardImage: {
            width: 20,
            height: 20,
        }
    })
};