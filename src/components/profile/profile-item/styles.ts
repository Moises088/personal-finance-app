import { StyleSheet, Dimensions } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10
        },
        containerIconText: {
            flexDirection: "row",
            alignItems: "center",
        },
        icon: {
            width: 40,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            color: theme.text.primary,
            marginLeft: 8,
            fontSize: 18
        },
        divisor: {
            borderTopWidth: .5,
            marginVertical: 5,
            borderTopColor: "rgba(255,255,255,0.05)"
        }
    })
};
