import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            margin: 8,
            flexDirection: "row",
            alignItems: "center"
        },
        containerIcon: {
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: theme.background.tertiary,
            alignItems: "center",
            justifyContent: "center"
        },
        containerInfo: {
            flex: 1,
            paddingLeft: 5
        },
        containerHeader: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 5
        },
        text: {
            letterSpacing: 1.05,
            color: theme.text.primary
        },
        image: {
            width: 38,
            height: 38,
            borderRadius: 38
        }
    })
};
