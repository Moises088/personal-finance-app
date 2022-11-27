import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#141b26",
            alignItems: "center",
            justifyContent: "center"
        },
        gif: {
            width: WINDOW_WIDTH * 0.7,
            height: WINDOW_WIDTH * 0.7
        },
        containerTitle: {
            marginTop: -WINDOW_WIDTH * 0.1,
            alignItems: "center",
        },
        title: {
            color: "#FFF",
            fontSize: 20,
            letterSpacing: 2,
            fontWeight: "bold"
        },
        subtitle: {
            color: "#FFF",
            fontSize: 16,
            letterSpacing: 1.2,
            marginTop: 5,
        }
    })
};
