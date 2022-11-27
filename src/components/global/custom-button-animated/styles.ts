import { StyleSheet, Dimensions } from 'react-native';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        btnContainer: {
            width: "100%",
            height: 44,
            borderRadius: 30
        },
        textContainer: {
            position: 'relative',
        },
        text: {
            color: theme.text.primary,
            fontWeight: 'bold',
            fontSize: 16
        },
        wordContainer: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            position: 'absolute',
            width: '100%',
            height: 44
        },
        containerDots: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "center",
            position: 'absolute',
            width: '100%',
            height: 44
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 8,
            marginRight: 3,
            backgroundColor: "#FFF",
        }
    })
};
