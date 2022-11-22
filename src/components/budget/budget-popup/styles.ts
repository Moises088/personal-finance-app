import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            backgroundColor: theme.background.tertiary,
            borderRadius: 10,
            marginTop: 10,
            padding: 10,
            zIndex: 1
        },
        content: {
            flexDirection: "row"
        },
        containerImage: {
            width: 90,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
        },
        containerInfo: {
            flex: 1,
            marginTop: 5,
            height: 65,
            alignItems: "center",
            justifyContent: "space-between"
        },
        title: {
            color: theme.text.primary,
            fontWeight: "600",
            fontSize: 20,
            letterSpacing: 1.1
        },
        image: {
            width: 80,
            height: 80,
            resizeMode: "cover",
            borderRadius: 20
        },
    })
};
