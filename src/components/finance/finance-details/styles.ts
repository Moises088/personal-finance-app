import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../types/screens/themes.type';

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
            height: 50
        },
        input: {
            backgroundColor: theme.background.tertiary,
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
            width: WINDOW_WIDTH - 30,
            marginLeft: 15,
            height: 35,
            paddingLeft: 4,
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        selectText: {
            color: '#FFF',
            marginLeft: 5
        },
        containerSelectIcon: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    })
};