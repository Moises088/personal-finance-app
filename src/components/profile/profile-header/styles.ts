import { StyleSheet, Dimensions } from 'react-native';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        containerHeader: {
            backgroundColor: "#1d2430",
            height: 100,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10
        },
        profile: {
            width: 65,
            height: 65,
            borderRadius: 50,
            borderWidth: 2,
            backgroundColor: "#fa795a",
            alignItems: "center",
            justifyContent: "center",
        },
        containerInfo: {
            width: WINDOW_WIDTH - 150,
            marginHorizontal: 10
        },
        text: {
            color: theme.text.primary,
            marginTop: 5
        },
        textBold: {
            fontWeight: "bold"
        },
        btn: {
            width: 30,
            height: 30,
            marginTop: 5,
            alignItems: "center",
            justifyContent: "center"
        }
    })
};
