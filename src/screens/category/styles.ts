import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../interfaces/screens/themes.interace';
import Constants from 'expo-constants'
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../constants/screen.contants';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            paddingTop: Constants.statusBarHeight
        },
        button: {
            width: "94%",
            marginLeft: "3%",
            backgroundColor: theme.button.primary,
            padding: 8,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: 'center',
            marginTop: 13,
            marginBottom: 10
        },
        buttonText: {
            color: theme.text.primary,
            fontWeight: 'bold'
        },
        backdrop: {
            position: 'relative',
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGTH,
            backgroundColor: 'rgba(0,0,0,0.7)'
        },
        modal: {
            position: 'absolute',
            bottom: 0,
            padding: 5,
            paddingVertical: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGTH - 90,
            backgroundColor: theme.background.primary,
            overflow: 'hidden',
            paddingTop: 20
        },
        input: {
            backgroundColor: theme.background.tertiary,
            marginLeft: 5
        },
        inputText: {
            color: theme.text.primary,
            fontSize: 17,
        },
        containerSelect: {
            width: WINDOW_WIDTH - 15,
            height: 50,
            paddingLeft: 4,
            marginTop: 5,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.background.tertiary,
            paddingRight: 10,
            marginLeft: 5,
            marginBottom: 8
        },
        selectText: {
            color: '#FFF',
            marginLeft: 5
        },
        containerSelectIcon: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        selectIcon: {
            width: 30,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 5
        },
        containerButton: {
            paddingHorizontal: 5,
            marginTop: 20
        },
        colorSelected: {
            width: 20,
            height: 20,
            borderRadius: 20
        }
    })
};
