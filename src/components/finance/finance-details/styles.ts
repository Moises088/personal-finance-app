import { StyleSheet } from 'react-native';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.tertiary,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingTop: 15
        },
        containerInput: {
            width: WINDOW_WIDTH - 30,
            marginLeft: 15,
            height: 50,
            marginBottom: 10
        },
        input: {
            backgroundColor: theme.background.primary,
            opacity: .8
        },
        inputText: {
            color: theme.text.primary,
            fontSize: 17
        },
        selectIcon: {
            width: 30,
            height: 48,
            alignItems: "center",
            justifyContent: "center"
        },
        containerSelect: {
            width: WINDOW_WIDTH - 40,
            marginLeft: 16,
            height: 48,
            marginTop: 8,
            borderRadius: 18,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.background.primary,
            paddingLeft: 4,
            paddingRight: 10,
            marginBottom: 4,
            opacity: .8
        },
        selectText: {
            color: '#FFF',
            marginLeft: 5
        },
        containerSelectIcon: {
            flexDirection: 'row',
            alignItems: 'center'
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
            overflow: 'hidden'
        }
    })
};