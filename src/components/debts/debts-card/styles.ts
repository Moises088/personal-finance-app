import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            width: "100%",
            height: 150,
            borderRadius: 15,
            backgroundColor: 'red',
            padding: 10
        },
        containerLogo: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
        },
        containerTitle: {
            flex: 1,
            justifyContent: "flex-end"
        },
        title: {
            fontSize: 15,
            fontWeight: "bold",
            letterSpacing: 1
        },
        image: {
            maxWidth: 90,
            maxHeight: 70,
            marginTop: 10
        }
    })
};